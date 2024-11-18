import {
  Box,
  Button,
  Modal,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Rate from "rc-rate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import {
  getReviewDetail,
  postReview,
  updateReview,
  deleteReview,
} from "../../api/review";

const ReviewModal = ({
  open,
  handleClose,
  rate = 0,
  movieId,
  movieTitle,
  posterSrc,
  reviewId,
  mode = "create",
  writerId,
}) => {
  const isTablet = useMediaQuery("(max-width:680px)");
  const [isEditMode, setIsEditMode] = useState(false);
  const currentUserId = localStorage.getItem("userId");
  const isOwner = currentUserId === writerId?.toString();

  const [review, setReview] = useState({
    id: movieId,
    rate: rate,
    content: "",
  });

  useEffect(() => {
    if (mode === "view" && reviewId) {
      getReviewDetail(reviewId).then((res) => {
        setReview({
          id: res.movieId,
          rate: res.rating,
          content: res.content,
        });
      });
    } else {
      setReview({
        id: movieId,
        rate: rate,
        content: "",
      });
    }
  }, [movieId, rate, mode, reviewId]);

  const handlePostReview = async () => {
    try {
      if (mode === "edit" || isEditMode) {
        await updateReview(reviewId, {
          rate: review.rate,
          content: review.content,
        });
      } else {
        await postReview(review);
      }
      handleClose();
    } catch (error) {
      console.error("리뷰 처리 실패", error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteReview(reviewId);
      handleClose();
    } catch (error) {
      console.error("리뷰 삭제 실패", error);
    }
  };

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
          {mode === "create"
            ? "리뷰 작성"
            : isEditMode
            ? "리뷰 수정"
            : "리뷰 상세"}
        </Typography>

        <div className="flex flex-row gap-5 mt-2">
          <img
            src={
              posterSrc ||
              "https://img.sbs.co.kr/newsnet/etv/upload/2023/10/10/30000880790.jpg"
            }
            alt="poster"
            className="w-[160px] max-w-[200px] sm:w-full"
          />
          <div className="flex flex-col w-full gap-2">
            <Typography variant="body1" style={{ fontWeight: "600" }}>
              {movieTitle}
            </Typography>
            <Rate
              value={review.rate}
              allowHalf
              character={
                <FontAwesomeIcon icon={faStar} style={{ fontSize: "24px" }} />
              }
              onChange={(value) => setReview({ ...review, rate: value })}
              disabled={mode === "view" && !isEditMode}
            />
            <TextField
              value={review.content}
              multiline
              rows={5}
              fullWidth
              variant="outlined"
              placeholder="리뷰를 작성해주세요."
              onChange={(e) =>
                setReview({ ...review, content: e.target.value })
              }
              disabled={mode === "view" && !isEditMode}
            />

            <div className="flex flex-row justify-end gap-2 mt-auto">
              {mode === "view" && isOwner && !isEditMode && (
                <>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => setIsEditMode(true)}
                  >
                    수정
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={handleDelete}
                  >
                    삭제
                  </Button>
                </>
              )}
              {(mode === "create" || isEditMode) && (
                <>
                  <Button
                    variant="contained"
                    color="inherit"
                    onClick={handleClose}
                  >
                    취소
                  </Button>
                  <Button
                    variant="contained"
                    color="inherit"
                    onClick={handlePostReview}
                  >
                    {isEditMode ? "수정완료" : "리뷰작성"}
                  </Button>
                </>
              )}
              {mode === "view" && !isEditMode && (
                <Button
                  variant="contained"
                  color="inherit"
                  onClick={handleClose}
                >
                  닫기
                </Button>
              )}
            </div>
          </div>
        </div>
      </Box>
    </Modal>
  );
};

export default ReviewModal;
