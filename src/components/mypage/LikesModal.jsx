import { Box, Button, Modal, Typography, useMediaQuery } from "@mui/material";
import React from "react";

const LikesModal = ({ open, handleClose, data = [] }) => {
  const isTablet = useMediaQuery("(max-width:680px)");

  return (
    <Modal
      className="bg-black bg-opacity-40 backdrop-blur-sm "
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
        <Typography variant="h5">찜한 영화 목록</Typography>
        <div className="flex flex-col gap-5 mt-2">
          <div className="grid grid-cols-4 gap-1 h-[400px] overflow-y-auto">
            {data &&
              data?.map((item) => (
                <div className="flex flex-col items-center gap-2 w-full">
                  <img
                    src={
                      item?.posterPath ||
                      item?.poster_path ||
                      "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAxOTA4MjhfMjkx%2FMDAxNTY2OTgwNjI3MTc4.vWk1ItHoUiqfYoarCMdFmGoOGX6XOwWpnj1IcvC6fLwg.-4m2XLXonbPbZ_M2u-pi3mKNWHKhovt9hqQe5bs3omcg.PNG.lavita-%2F1.%25BF%25B5%25C8%25AD1987%25C6%25F7%25BD%25BA%25C5%25CD.png&type=sc960_832"
                    }
                    alt="profile"
                    className="w-[120px] h-[160px] object-cover"
                  />
                  <Typography variant="body2" className="max-w-full truncate">
                    {item?.movie_title}
                  </Typography>
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

export default LikesModal;
