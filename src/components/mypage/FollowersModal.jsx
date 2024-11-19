import { Box, Button, Modal, Typography, useMediaQuery } from "@mui/material";
import React from "react";

const FollowersModal = ({ title, open, handleClose, data = [] }) => {
  const isTablet = useMediaQuery("(max-width:680px)");

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
          {title}
        </Typography>
        <div className="flex flex-col gap-5 mt-2 h-[400px] overflow-y-auto">
          <div className="grid grid-cols-5 gap-1">
            {data &&
              data?.map((item) => (
                <div
                  className="flex flex-col items-center gap-1 p-2"
                  id={item.user_id}
                  key={item.user_id}
                >
                  <img
                    src={
                      item.profile_url ||
                      "https://avatars.githubusercontent.com/u/89841486?v=4"
                    }
                    alt="profile"
                    className="rounded-full w-16 h-16 object-cover"
                  />
                  <Typography variant="body2">{item.nickname}</Typography>
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
