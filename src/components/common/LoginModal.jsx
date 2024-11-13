import {
  Box,
  Button,
  Modal,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { useState } from "react";
import { postSignIn } from "../../api/user";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment } from "@fortawesome/free-solid-svg-icons";

const LoginModal = ({ open, handleClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const isMobile = useMediaQuery("(max-width:550px)");
  const [loginData, setLoginData] = React.useState({
    id: "",
    password: "",
  });

  const handleKakaoLogin = () => {
    window.location.href = "http://3.38.104.1:8080/cinewall/auth/oauth2/kakao";
  };

  const handleSignIn = () => {
    postSignIn(loginData).then((res) => console.log(res));
  };

  // const handleSignUp = () => {
  //     postSignUp()
  // }

  return (
    <Modal open={open} onClose={handleClose}>
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
        {isLogin ? (
          <>
            <Typography variant="h5">로그인</Typography>
            <div className="flex flex-col gap-2 my-2">
              <TextField
                label="이메일"
                className="w-full"
                value={loginData.id}
                onChange={(e) =>
                  setLoginData({ ...loginData, id: e.target.value })
                }
              />
              <TextField
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
        ) : (
          <>
            <Typography variant="h5">회원가입</Typography>
            <div className="flex flex-col gap-2 my-2">
              <div className="flex flex-row w-full gap-2">
                <TextField
                  label="이메일"
                  className="w-full"
                  value={loginData.id}
                  onChange={(e) =>
                    setLoginData({ ...loginData, id: e.target.value })
                  }
                />
                <Button
                  variant="contained"
                  color="inherit"
                  sx={{
                    minWidth: "100px",
                  }}
                >
                  이메일 인증
                </Button>
              </div>
              <div className="flex flex-row w-full gap-2">
                <TextField
                  label="인증번호"
                  className="w-full"
                  value={loginData.password}
                  onChange={(e) =>
                    setLoginData({ ...loginData, password: e.target.value })
                  }
                />
                <Button
                  variant="contained"
                  color="inherit"
                  sx={{
                    minWidth: "100px",
                  }}
                >
                  인증 확인
                </Button>
              </div>
              <div className="flex flex-row w-full gap-2">
                <TextField
                  label="아이디"
                  className="w-full"
                  value={loginData.id}
                  onChange={(e) =>
                    setLoginData({ ...loginData, id: e.target.value })
                  }
                />
                <Button
                  variant="contained"
                  color="inherit"
                  sx={{
                    minWidth: "100px",
                  }}
                >
                  중복 확인
                </Button>
              </div>
              <TextField
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
        )}
      </Box>
    </Modal>
  );
};

export default LoginModal;
