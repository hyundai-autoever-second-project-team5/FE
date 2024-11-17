import { faThumbsUp, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconButton, Typography } from "@mui/material";
import Rate from "rc-rate";
import React from "react";
import ReviewModal from "./ReviewModal";
import { detaillikeReview, detailunlikeReview } from "../../api/detail";
import { useGetComments } from "../../hook/useGetComments";

const Comment = ({
  id,
  profileSrc,
  writer,
  score,
  posterSrc,
  title,
  content,
  likes,
  comments,
  heart,
  updateLike, // 부모로부터 전달받은 함수
}) => {
  const [open, setOpen] = React.useState(false);
  const { refetch } = useGetComments();

  const handleLike = async (e) => {
    e.stopPropagation(); // 부모의 onClick 이벤트 방지
    try {
      if (heart) {
        await detailunlikeReview(id);
        updateLike(id, false); // 부모 상태 업데이트 호출
      } else {
        await detaillikeReview(id);
        updateLike(id, true); // 부모 상태 업데이트 호출
      }
    } catch (error) {
      console.error("좋아요 처리에 실패했습니다.", error);
      // 사용자에게 에러 알림을 추가할 수 있습니다.
    }
    refetch();
  };

  return (
    <>
      <div
        className="flex flex-col gap-2 p-3 w-full xl:max-w-[360px] bg-gray-300 bg-opacity-20 rounded-lg backdrop-blur-sm"
        onClick={() => setOpen(true)}
      >
        <div className="flex flex-row items-center justify-between">
          <div className="flex flex-row items-center gap-2">
            <img
              src={profileSrc}
              className="w-10 h-10 rounded-full"
              alt="프로필"
            />
            <Typography variant="caption">{writer}</Typography>
          </div>
          <Rate
            value={score}
            allowHalf
            character={
              <FontAwesomeIcon icon={faStar} style={{ fontSize: "12px" }} />
            }
            disabled
          />
        </div>
        <div className="flex flex-row gap-2">
          <img src={posterSrc} className="max-w-[80px]" alt="포스터" />
          <div className="flex flex-col gap-2">
            <Typography variant="body1">{title}</Typography>
            <Typography variant="body2">{content}</Typography>
          </div>
        </div>
        <hr />
        <div className="flex flex-row items-center gap-2">
          <div className="flex flex-row items-center" onClick={handleLike}>
            <IconButton>
              <FontAwesomeIcon
                icon={faThumbsUp}
                color={heart ? "yellow" : "white"}
              />
            </IconButton>
            <Typography variant="caption">{likes}</Typography>
          </div>
          {/* 
          <div className="flex flex-row items-center">
            <IconButton>
              <FontAwesomeIcon icon={faComment} color="white" />
            </IconButton>
            <Typography variant="caption">{comments}</Typography>
          </div> 
          */}
        </div>
      </div>
      <ReviewModal
        open={open}
        closeModal={() => setOpen(false)}
        reviewId={id}
      />
    </>
  );
};

export default Comment;
