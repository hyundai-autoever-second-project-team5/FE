import {
  Box,
  Button,
  Modal,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React from "react";

const FollowersModal = ({ open, handleClose }) => {
  const isTablet = useMediaQuery("(max-width:680px)");

  return (
    <Modal className="bg-black bg-opacity-40 backdrop-blur-sm"
    open={open} onClose={handleClose}>
      <Box className="bg-gray-200 bg-opacity-60 backdrop-blur-md"
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
        <Typography variant="h5" style={{ fontWeight: '600' }}>효원님을 팔로우한 사람</Typography>
        <div className="flex flex-col gap-5 mt-2">
          <div className="grid grid-cols-5 gap-2">
            {Array(9)
              .fill(0)
              .map((item) => (
                <div className="flex flex-col items-center gap-1 p-2">
                  <img
                    src="https://avatars.githubusercontent.com/u/89841486?v=4"
                    alt="profile"
                    className="rounded-full"
                  />
                  <Typography variant="body2">닉네임</Typography>
                </div>
              ))}
          </div>
          <div className="flex flex-row justify-end gap-2 mt-auto">
            <Button variant="contained" color="inherit" onClick={handleClose}>
              닫기
            </Button>
          </div>
        </div>
      </Box>
    </Modal>
  );
};

export default FollowersModal;
