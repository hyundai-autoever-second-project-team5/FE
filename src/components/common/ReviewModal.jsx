import {
  Box,
  Button,
  Modal,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { useEffect } from "react";
import Rate from "rc-rate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { getReviewDetail, postReview } from "../../api/review";
import { useGetUserInfo } from "../../hook/useGetUserInfo";
import { getCookie } from "../../api/cookie";
import { useGetLatestMovies } from "../../hook/useGetLatestMovies";
import { useGetLikeMovies } from "../../hook/useGetLikeMovies";
import { useGetUserMovies } from "../../hook/useGetUserMovies";
import { useGetPopularMovies } from "../../hook/useGetPopularMovies";
import { useGetDetailLatestReviews } from "../../hook/useGetDetailLatestReviews";
import { useGetDetailRecommendReviews } from "../../hook/useGetDetailRecommendReviews";

const ReviewModal = ({
  open,
  handleClose,
  rate = 0,
  movieId,
  reviewId,
  movieTitle,
  posterSrc,
}) => {
  const { refetch: likedMoviesRefetch } = useGetLikeMovies(
    getCookie("accessToken")
  );
  const { refetch: userMoviesRefetch } = useGetUserMovies(
    getCookie("accessToken")
  );
  const { refetch: latestMoviesRefetch } = useGetLatestMovies();
  const { refetch: popularMoviesRefetch } = useGetPopularMovies();
  const { refetch: detailLatestReviewsRefetch } =
    useGetDetailLatestReviews(movieId);
  const { refetch: detailRecommendReviewsRefetch } =
    useGetDetailRecommendReviews(movieId);
  const isTablet = useMediaQuery("(max-width:680px)");
  const [newReviews, setNewReviews] = React.useState({
    id: movieId,
    rate: rate,
    content: "",
  });

  const handlePostReview = () => {
    postReview(newReviews)
      .then((res) => {
        detailRecommendReviewsRefetch();
        detailLatestReviewsRefetch();
        likedMoviesRefetch();
        userMoviesRefetch();
        latestMoviesRefetch();
        popularMoviesRefetch();
        handleClose();
      })
      .catch((error) => {
        alert("리뷰 작성 실패:", error);
      });
  };

  useEffect(() => {
    setNewReviews({
      ...newReviews,
      id: movieId,
      rate: rate,
      content: "",
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [movieId, rate]);

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
          리뷰 작성
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
              {movieTitle}
            </Typography>
            <Rate
              value={newReviews.rate}
              allowHalf
              character={
                <FontAwesomeIcon
                  icon={faStar}
                  style={{ fontSize: isTablet ? "16px" : "24px" }}
                />
              }
              onChange={(value) =>
                setNewReviews({ ...newReviews, rate: value })
              }
            />
            <TextField
              value={newReviews?.content}
              multiline
              rows={5} // 원하는 줄 수 설정
              fullWidth
              variant="outlined"
              placeholder="리뷰를 작성해주세요."
              onChange={(e) =>
                setNewReviews({ ...newReviews, content: e.target.value })
              }
            />
            <div className="flex flex-row justify-end gap-2 mt-auto">
              <Button variant="contained" color="inherit" onClick={handleClose}>
                취소
              </Button>
              <Button
                variant="contained"
                color="inherit"
                onClick={handlePostReview}
                handleClose={handleClose}
              >
                리뷰작성
              </Button>
            </div>
          </div>
        </div>
      </Box>
    </Modal>
  );
};

export default ReviewModal;
