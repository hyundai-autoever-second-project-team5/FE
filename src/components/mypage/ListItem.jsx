import { Typography } from "@mui/material";
import React from "react";

const ListItem = ({ id, name, profile, score, movies }) => {
  return (
    <div
      className="flex flex-row justify-between items-center bg-white bg-opacity-20 backdrop-blur-md p-3 rounded-md w-full"
      key={id}
    >
      <div className="flex flex-row gap-3 items-center w-full max-w-[calc(100%-120px)]">
        {/* 프로필 이미지 */}
        <div className="flex-shrink-0">
          <img
            src={
              profile ||
              "https://search.pstatic.net/common?type=b&size=216&expire=1&refresh=true&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2Fportrait%2F202009%2F20200910113051466.jpg"
            }
            alt="director"
            className="w-[80px] h-[80px] rounded-full object-cover"
          />
        </div>
        {/* 이름과 영화 리스트 */}
        <div className="flex flex-grow flex-col gap-2 px-3 overflow-hidden w-full min-w-0">
          <Typography variant="body1">{name}</Typography>
          <div className="truncate flex-grow min-w-0">
            {movies.map((item) => item.title).join(", ")}
          </div>
        </div>
      </div>
      {/* 점수 */}
      <div className="w-[120px] text-center">
        <Typography variant="body2">
          평균&nbsp;
          <span style={{ fontSize: "20px", fontWeight: "700" }}>
            {score}
          </span>{" "}
          점
        </Typography>
      </div>
    </div>
  );
};

export default ListItem;
