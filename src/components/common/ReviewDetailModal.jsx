import {
  Box,
  Button,
  Modal,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import Rate from "rc-rate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar,faTimes } from "@fortawesome/free-solid-svg-icons";
import { getReviewDetail, updateReview, deleteReview } from "../../api/review";
import { useGetUserInfo } from "../../hook/useGetUserInfo";
import { useGetComments } from "../../hook/useGetComments";
import { useGetDetailLatestReviews } from "../../hook/useGetDetailLatestReviews";
import { useGetDetailRecommendReviews } from "../../hook/useGetDetailRecommendReviews";

const ReviewDetailModal = ({
  open,
  handleClose,
  reviewId,
  posterSrc,
  content,
  writerId,
  movieId,
}) => {
  const { refetch } = useGetComments();
  const { refetch: detailLatestReviewsRefetch } = useGetDetailLatestReviews();
  const { refetch: detailRecommendReviewsRefetch } =
    useGetDetailRecommendReviews();
  const isTablet = useMediaQuery("(max-width:680px)");
  const [isEditing, setIsEditing] = useState(false);
  const [review, setReview] = useState({
    rating: 0,
    content: content,
    movieTitle: "",
  });

  const { data } = useGetUserInfo({});
  useEffect(() => {
    if (open && reviewId) {
      // 기존 content 값을 먼저 설정
      setReview((prev) => ({
        ...prev,
        content: content,
      }));

      // API로 상세 데이터 조회
      getReviewDetail(reviewId)
        .then((data) => {
          setReview({
            rating: data.rating,
            content: data.content,
            movieTitle: data.title || data.movie?.title,
          });
        })
        .catch((error) => console.error("리뷰 상세 조회 실패", error));
    }
  }, [open, reviewId, content]);

  const handleUpdate = async () => {
    try {
      await updateReview(reviewId, {
        rate: review.rating,
        content: review.content,
      }).then((res) => {
        refetch();
        detailLatestReviewsRefetch();
        detailRecommendReviewsRefetch();
      });

      setIsEditing(false);
      handleClose();
    } catch (error) {
      console.error("리뷰 수정 실패", error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteReview(reviewId).then((res) => {
        refetch();
        detailLatestReviewsRefetch();
        detailRecommendReviewsRefetch();
      });
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
        <div className="absolute top-2 right-2">
          <FontAwesomeIcon
            icon={faTimes}
            onClick={handleClose}
            className="cursor-pointer"
            style={{ fontSize: "24px" }}
          />
        </div>
        <Typography variant="h5" style={{ fontWeight: "600" }}>
          리뷰 상세
        </Typography>
        <div className="flex flex-row gap-5 mt-2">
          <img
            src={
              posterSrc ||
              "https://img.sbs.co.kr/newsnet/etv/upload/2023/10/10/30000880790.jpg"
            }
            alt="poster"
            className="w-[120px] h-[160px] object-cover max-w-[200px] sm:w-full sm:h-auto"
          />
          <div className="flex flex-col w-full gap-2">
            <Typography variant="body1" style={{ fontWeight: "600" }}>
              {review.movieTitle}
            </Typography>
            <Rate
              value={review.rating}
              allowHalf
              character={
                <FontAwesomeIcon
                  icon={faStar}
                  style={{ fontSize: isTablet ? "16px" : "24px" }}
                />
              }
              onChange={(value) =>
                isEditing && setReview({ ...review, rating: value })
              }
              disabled={!isEditing}
            />
            <TextField
              value={review.content}
              multiline
              rows={5}
              fullWidth
              variant="outlined"
              disabled={!isEditing}
              onChange={(e) =>
                setReview({ ...review, content: e.target.value })
              }
            />
            <div className="flex flex-row justify-end gap-2 mt-auto">
              {isEditing ? (
                <>
                  <Button
                    variant="contained"
                    color="inherit"
                    onClick={() => setIsEditing(false)}
                  >
                    취소
                  </Button>
                  <Button
                    variant="contained"
                    color="inherit"
                    onClick={handleUpdate}
                  >
                    수정완료
                  </Button>
                </>
              ) : (
                <>
                  {data?.userId === writerId && (
                    <>
                      <Button
                        variant="contained"
                        color="inherit"
                        onClick={() => setIsEditing(true)}
                      >
                        수정
                      </Button>
                      <Button
                        variant="contained"
                        color="inherit"
                        onClick={handleDelete}
                      >
                        삭제
                      </Button>
                    </>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </Box>
    </Modal>
  );
};

export default ReviewDetailModal;
