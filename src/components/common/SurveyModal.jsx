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

const SurveyModal = ({ open, handleClose }) => {
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
        <Typography variant="h5">리뷰 작성</Typography>
        <div className="flex flex-row gap-5 mt-2">
          <img
            src="https://img.sbs.co.kr/newsnet/etv/upload/2023/10/10/30000880790.jpg"
            alt="poster"
            className="w-[160px] max-w-[200px] sm:w-full"
          />
          <div className="flex flex-col gap-2 w-full">
            <Typography variant="body1">STAR TREX</Typography>
            <Rate
              allowHalf
              character={
                <FontAwesomeIcon icon={faStar} style={{ fontSize: "24px" }} />
              }
              onChange={(value) => console.log(value)}
            />
            <TextField
              multiline
              rows={5} // 원하는 줄 수 설정
              fullWidth
              variant="outlined"
              placeholder="리뷰를 작성해주세요."
            />
            <div className="flex flex-row justify-end gap-2 mt-auto">
              <Button variant="contained" color="inherit" onClick={handleClose}>
                취소
              </Button>
              <Button variant="contained" color="inherit">
                리뷰작성
              </Button>
            </div>
          </div>
        </div>
      </Box>
    </Modal>
  );
};

export default SurveyModal;
