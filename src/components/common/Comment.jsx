import { faComment, faThumbsUp } from "@fortawesome/free-regular-svg-icons";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconButton, Typography } from "@mui/material";
import Rate from "rc-rate";
import React from "react";

const Comment = ({
  profileSrc,
  writer,
  score,
  posterSrc,
  title,
  content,
  likes,
  comments,
}) => {
  return (
    <div className="flex flex-col gap-2 p-3 max-w-[350px] bg-white rounded-lg">
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-row gap-2 items-center">
          <img src={profileSrc} className="rounded-full w-10 h-10" />
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
        <img src={posterSrc} className="max-w-[80px]" />
        <div className="flex flex-col gap-2">
          <Typography variant="body1">{title}</Typography>
          <Typography variant="body2">{content}</Typography>
        </div>
      </div>
      <hr />
      <div className="flex flex-row items-center gap-2">
        <div className="flex flex-row items-center">
          <IconButton>
            <FontAwesomeIcon icon={faThumbsUp} />
          </IconButton>
          <Typography variant="caption">{likes}</Typography>
        </div>
        <div className="flex flex-row items-center">
          <IconButton>
            <FontAwesomeIcon icon={faComment} />
          </IconButton>
          <Typography variant="caption">{comments}</Typography>
        </div>
      </div>
    </div>
  );
};

export default Comment;
