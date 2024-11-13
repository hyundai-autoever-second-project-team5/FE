import {
  Box,
  Button,
  Modal,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React from "react";
import Rate from "rc-rate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

const ProfileEditModal = ({ open, handleClose }) => {
  const isTablet = useMediaQuery("(max-width:680px)");

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: isTablet ? "90%" : 600,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 3,
          borderRadius: "8px",
        }}
      >
        <Typography variant="h5">프로필 수정</Typography>
        <div className="flex flex-col gap-5 mt-2">
          <img
            src="https://avatars.githubusercontent.com/u/89841486?v=4"
            alt="profile-image"
            className="w-[140px] h-[140px] rounded-full object-contain self-center"
          />
          <TextField variant="outlined" label="닉네임" />
          <TextField variant="outlined" label="아이디" />
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
