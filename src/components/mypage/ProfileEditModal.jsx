import {
  Box,
  Button,
  Modal,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { useState } from "react";
import { postUserInfoEdit } from "../../api/user";

const ProfileEditModal = ({ open, handleClose, data }) => {
  const isTablet = useMediaQuery("(max-width:680px)");
  const [userData, setUserData] = useState({
    nickname: data?.nickname,
    id: data?.id,
    profile: data?.profileImg,
  });

  // const handlePostEdit = () => {
  //   const formData = new FormData();
  //   formData.append("nickname", userData.nickname);
  //   formData.append("id", userData.id);
  //   postUserInfoEdit();
  // };

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
          <img
            src={
              userData?.profileUrl ||
              "https://avatars.githubusercontent.com/u/89841486?v=4"
            }
            alt="profile-image"
            className="w-[140px] h-[140px] rounded-full object-cover self-center"
          />
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
            <Button variant="contained" color="inherit" onClick={handleClose}>
              취소
            </Button>
            <Button variant="contained" color="inherit">
              프로필 수정
            </Button>
          </div>
        </div>
      </Box>
    </Modal>
  );
};

export default ProfileEditModal;
