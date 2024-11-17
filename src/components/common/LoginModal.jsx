import {
  Box,
  Button,
  checkboxClasses,
  Modal,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  postCheckCertification,
  postCheckEmail,
  postCheckId,
  postSignIn,
  postSignUp,
} from "../../api/user";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment } from "@fortawesome/free-solid-svg-icons";
import { getCookie, setCookie } from "../../api/cookie";
import { useGetUserInfo } from "../../hook/useGetUserInfo";
import useModalStore from "../../store/store";

const LoginModal = ({ open, handleClose }) => {
  const { refetch } = useGetUserInfo(getCookie("accessToken"));
  const surveyOpen = useModalStore((state) => state.surveyOpen);
  const setSurveyOpen = useModalStore((state) => state.setSurveyOpen);
  const [isLogin, setIsLogin] = useState(true);
  const isMobile = useMediaQuery("(max-width:550px)");
  const [loginData, setLoginData] = React.useState({
    id: "",
    password: "",
  });
  const [signUpData, setSignUpData] = React.useState({
    id: "",
    nickname: "",
    password: "",
    email: "",
    certificationNumber: "",
    image: null,
  });
  const [checked, setChecked] = React.useState({
    id: "pending",
    email: "pending",
    certificationNumber: "pending",
  });
  const [emailHelperText, setEmailHelperText] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const isSignUpDisabled = !(
    signUpData.id &&
    signUpData.nickname &&
    signUpData.password &&
    signUpData.email &&
    signUpData.certificationNumber &&
    signUpData.image &&
    checked.email &&
    checked.certificationNumber &&
    checked.id
  );

  // 초기화하면서 모달 닫기
  const handleCloseWithReset = () => {
    setIsLogin(true);
    setLoginData({
      id: "",
      password: "",
    });
    setSignUpData({
      id: "",
      nickname: "",
      password: "",
      email: "",
      certificationNumber: "",
      image: null,
    });
    handleClose();
  };

  const handleKakaoLogin = () => {
    window.location.href = "http://3.38.104.1:8080/cinewall/auth/oauth2/kakao";
  };

  // 로그인
  const handleSignIn = () => {
    postSignIn(loginData).then((res) => {
      const authToken = res.headers["authorization"];
      const token = authToken.replace("Bearer ", "");
      new Promise((resolve) => {
        setCookie("accessToken", token);
        resolve();
      }).then(() => setSurveyOpen(true));
      handleClose();
      refetch();
    });
  };

  // 회원가입
  const handleSignUp = () => {
    const formData = new FormData();
    formData.append("id", signUpData.id);
    formData.append("password", signUpData.password);
    formData.append("nickname", signUpData.nickname);
    formData.append("email", signUpData.email);
    formData.append("certificationNumber", signUpData.certificationNumber);
    console.log("image", signUpData.image);
    formData.append("image", signUpData.image);
    postSignUp(formData).then((res) => {
      console.log(res);
      setIsLogin(true);
      handleCloseWithReset();
    });
  };

  // 프로필 이미지 업로드 핸들러
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const imageUrl = URL.createObjectURL(file);
    if (file) {
      setSignUpData({ ...signUpData, image: file });
      setImageUrl(imageUrl);
    }
  };

  // 이메일 핸들러
  const handleEmailChange = (e) => {
    const email = e.target.value;
    setSignUpData({ ...signUpData, email });
    setChecked({ ...checked, email: "pending" });

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email) && checked.email === "pending") {
      setEmailHelperText("올바른 이메일 형식을 입력하세요.");
    } else {
      setEmailHelperText("");
    }
  };

  // 이메일 인증번호 전송
  const handleCheckEmail = () => {
    setChecked({ ...checked, email: "sending" });
    postCheckEmail(signUpData.id, signUpData.email).then((res) => {
      setChecked({ ...checked, email: res.available });
      setEmailHelperText("이메일에 인증번호를 전송했습니다.");
    });
  };

  // 이메일 인증 확인
  const handleCheckCertification = () => {
    postCheckCertification(
      signUpData.id,
      signUpData.email,
      signUpData.certificationNumber
    ).then((res) =>
      setChecked({ ...checked, certificationNumber: res.available })
    );
  };

  // 아이디 중복 확인
  const handleCheckId = () => {
    postCheckId(signUpData.id).then((res) =>
      setChecked({ ...checked, id: res.available })
    );
  };

  // 로그인 회원가입 이동시 값 초기화
  useEffect(() => {
    setLoginData({
      id: "",
      password: "",
    });
    setSignUpData({
      id: "",
      nickname: "",
      password: "",
      email: "",
      certificationNumber: "",
      image: null,
    });
  }, [isLogin]);

  // 로그인 페이지
  const renderLoginPage = () => {
    return (
      <>
        <Typography variant="h5">로그인</Typography>
        <div className="flex flex-col gap-2 my-2">
          <TextField
            label="아이디"
            className="w-full"
            value={loginData.id}
            onChange={(e) => setLoginData({ ...loginData, id: e.target.value })}
          />
          <TextField
            type="password"
            label="비밀번호"
            className="w-full"
            value={loginData.password}
            onChange={(e) =>
              setLoginData({ ...loginData, password: e.target.value })
            }
          />
        </div>
        <div className="flex flex-col gap-2 my-3">
          <Button
            variant="contained"
            color="inherit"
            className="w-full"
            onClick={handleSignIn}
          >
            로그인
          </Button>
          <Button
            variant="text"
            color="inherit"
            className="w-full"
            onClick={() => setIsLogin(false)}
          >
            아직 회원이 아니신가요?
          </Button>
        </div>
        <Button
          variant="contained"
          onClick={handleKakaoLogin}
          className="w-full"
          startIcon={<FontAwesomeIcon icon={faComment} />}
          sx={{
            backgroundColor: "#FEE500",
            color: "#191919",
          }}
        >
          카카오로 로그인하기
        </Button>
      </>
    );
  };

  // 회원가입 페이지
  const renderSignUpPage = () => {
    return (
      <>
        <Typography variant="h5">회원가입</Typography>
        <div className="w-full flex flex-col items-center justify-center gap-3 mb-5">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt="프로필 이미지"
              className="w-24 h-24 rounded-full object-cover"
            />
          ) : (
            <img
              src="https://blog.kakaocdn.net/dn/bfZZQd/btrua3HciZ9/jSnHklZw9ekuzV8YGLZ9zK/%EC%B9%B4%ED%86%A1%20%EA%B8%B0%EB%B3%B8%ED%94%84%EB%A1%9C%ED%95%84%20%EC%82%AC%EC%A7%84%28%EC%97%B0%EC%B4%88%EB%A1%9Dver%29.jpg?attach=1&knm=img.jpg"
              className="w-24 h-24 rounded-full"
              alt="no-profile"
            />
          )}
          <Button variant="contained" component="label" color="inherit">
            파일 업로드
            <input type="file" hidden onChange={handleImageUpload} />
          </Button>
        </div>
        <div className="flex flex-col gap-2 my-2">
          <TextField
            label="닉네임"
            className="w-full"
            value={signUpData.nickname}
            onChange={(e) =>
              setSignUpData({ ...signUpData, nickname: e.target.value })
            }
          />
          <div className="flex flex-row w-full gap-2">
            <TextField
              label="아이디"
              className="w-full"
              value={signUpData.id}
              onChange={(e) => {
                setSignUpData({ ...signUpData, id: e.target.value });
                setChecked({ ...checked, id: "pending" });
              }}
              helperText={
                signUpData.id && checked.id && checked.id !== "pending"
                  ? "사용 가능한 아이디입니다."
                  : ""
              }
              FormHelperTextProps={{
                sx: {
                  color: checked.id ? "green" : "inherit", // 인증 성공 시 초록색으로 설정
                },
              }}
            />
            <Button
              variant="contained"
              color="inherit"
              disabled={!signUpData.id}
              sx={{
                minWidth: "100px",
              }}
              onClick={handleCheckId}
            >
              중복 확인
            </Button>
          </div>
          <div className="flex flex-row w-full gap-2">
            <TextField
              label="이메일"
              className="w-full"
              value={signUpData.email}
              onChange={handleEmailChange}
              disabled={!signUpData.id}
              error={
                checked.email === "pending" &&
                !!emailHelperText &&
                signUpData.email
              }
              helperText={
                (signUpData.email && emailHelperText) ||
                (signUpData.email && checked.email && emailHelperText)
              }
              FormHelperTextProps={{
                sx: {
                  color: checked.id ? "green" : "inherit", // 인증 성공 시 초록색으로 설정
                },
              }}
            />
            <Button
              variant="contained"
              color="inherit"
              disabled={
                !signUpData.email ||
                emailHelperText ||
                checked.email === "sending"
              }
              sx={{
                minWidth: "100px",
              }}
              onClick={handleCheckEmail}
            >
              {checked.email === "sending" ? "전송 중" : "코드 전송"}
            </Button>
          </div>
          <div className="flex flex-row w-full gap-2">
            <TextField
              label="인증번호"
              className="w-full"
              value={signUpData.certificationNumber}
              onChange={(e) =>
                setSignUpData({
                  ...signUpData,
                  certificationNumber: e.target.value,
                })
              }
              helperText={
                signUpData.certificationNumber &&
                checked.certificationNumber &&
                checked.certificationNumber !== "pending"
                  ? "인증되었습니다."
                  : signUpData.certificationNumber &&
                    checked.certificationNumber &&
                    checked.certificationNumber === "pending"
                  ? ""
                  : signUpData.certificationNumber &&
                    !checked.certificationNumber
                  ? "잘못된 인증 번호입니다."
                  : ""
              }
              disabled={
                !signUpData.id ||
                !signUpData.email ||
                !checked.email ||
                !checked.id
              }
              FormHelperTextProps={{
                sx: {
                  color: checked.id ? "green" : "inherit", // 인증 성공 시 초록색으로 설정
                },
              }}
            />
            <Button
              variant="contained"
              color="inherit"
              sx={{
                minWidth: "100px",
              }}
              disabled={
                !signUpData.certificationNumber ||
                !signUpData.id ||
                !signUpData.email ||
                !checked.email ||
                !checked.id
              }
              onClick={handleCheckCertification}
            >
              인증 확인
            </Button>
          </div>
          <TextField
            type="password"
            label="비밀번호"
            className="w-full"
            value={signUpData.password}
            onChange={(e) =>
              setSignUpData({ ...signUpData, password: e.target.value })
            }
          />
        </div>
        <div className="flex flex-col gap-2 my-3">
          <Button
            variant="contained"
            color="inherit"
            className="w-full"
            onClick={handleSignUp}
            disabled={isSignUpDisabled}
          >
            회원가입
          </Button>
          <Button
            variant="text"
            color="inherit"
            className="w-full"
            onClick={() => setIsLogin(true)}
          >
            로그인 화면으로 이동
          </Button>
        </div>
        <Button
          variant="contained"
          onClick={handleKakaoLogin}
          className="w-full"
          startIcon={<FontAwesomeIcon icon={faComment} />}
          sx={{
            backgroundColor: "#FEE500",
            color: "#191919",
          }}
        >
          카카오로 회원가입하기
        </Button>
      </>
    );
  };

  return (
    <Modal open={open} onClose={handleCloseWithReset}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: isMobile ? "90%" : 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 3,
          borderRadius: "8px",
        }}
      >
        {isLogin ? renderLoginPage() : renderSignUpPage()}
      </Box>
    </Modal>
  );
};

export default LoginModal;
