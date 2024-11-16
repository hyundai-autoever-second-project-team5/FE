import {
  Box,
  Button,
  Modal,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { patchProfileEdit } from "../../api/user";
import { useGetUserInfo } from "../../hook/useGetUserInfo";
import { getCookie } from "../../api/cookie";

const ProfileEditModal = ({ open, handleClose, data }) => {
  const { refetch } = useGetUserInfo(getCookie("accessToken"));
  const isTablet = useMediaQuery("(max-width:680px)");
  const [userData, setUserData] = useState({
    nickname: data?.nickname,
    id: data?.id,
    profile: null,
  });
  const [imageUrl, setImageUrl] = useState("");

  const handleCloseWithReset = () => {
    setImageUrl("");
    handleClose();
  };

  const handlePostEdit = () => {
    const formData = new FormData();
    formData.append("nickname", userData.nickname);
    formData.append("id", userData.id);
    if (userData?.profile) {
      formData.append("profile", userData.profile);
    }
    patchProfileEdit(formData).then(() => {
      refetch();
      handleCloseWithReset();
    });
  };

  // 프로필 이미지 업로드 핸들러
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const imageUrl = URL.createObjectURL(file);
    if (file) {
      setUserData({ ...userData, profile: file });
      setImageUrl(imageUrl);
    }
  };

  useEffect(() => {
    setUserData({
      nickname: data?.nickname,
      id: data?.id,
      profile: null,
    });
  }, []);

  return (
    <Modal
      className="bg-black bg-opacity-40 backdrop-blur-sm"
      open={open}
      onClose={handleClose}
    >
      <Box
        className="bg-gray-200 bg-opacity-60 backdrop-blur-md"
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: isTablet ? "90%" : 600,
          boxShadow: 24,
          p: 3,
          borderRadius: "8px",
        }}
      >
        <Typography variant="h5" style={{ fontWeight: "600" }}>
          프로필 수정
        </Typography>
        <div className="flex flex-col gap-5 mt-2">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt="프로필 이미지"
              className="w-[140px] h-[140px] rounded-full object-cover self-center"
            />
          ) : (
            <img
              src={
                data?.profile_url ||
                "https://blog.kakaocdn.net/dn/bfZZQd/btrua3HciZ9/jSnHklZw9ekuzV8YGLZ9zK/%EC%B9%B4%ED%86%A1%20%EA%B8%B0%EB%B3%B8%ED%94%84%EB%A1%9C%ED%95%84%20%EC%82%AC%EC%A7%84%28%EC%97%B0%EC%B4%88%EB%A1%9Dver%29.jpg?attach=1&knm=img.jpg"
              }
              className="w-[140px] h-[140px] rounded-full self-center"
              alt="no-profile"
            />
          )}
          <Button
            variant="contained"
            component="label"
            color="inherit"
            className="self-center"
          >
            파일 업로드
            <input type="file" hidden onChange={handleImageUpload} />
          </Button>
          <TextField
            value={userData?.nickname}
            variant="outlined"
            label="닉네임"
            onChange={(e) =>
              setUserData({ ...userData, nickname: e.target.value })
            }
          />
          <TextField
            value={userData?.id}
            variant="outlined"
            label="아이디"
            onChange={(e) => setUserData({ ...userData, id: e.target.value })}
          />
          <div className="flex flex-row justify-end gap-2 mt-auto">
            <Button
              variant="contained"
              color="inherit"
              onClick={handleCloseWithReset}
            >
              취소
            </Button>
            <Button
              variant="contained"
              color="inherit"
              onClick={handlePostEdit}
            >
              프로필 수정
            </Button>
          </div>
        </div>
      </Box>
    </Modal>
  );
};

export default ProfileEditModal;
