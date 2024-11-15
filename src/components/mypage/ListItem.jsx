import { Typography } from "@mui/material";
import React from "react";

const ListItem = ({ id, name, profile, score, movies }) => {
  return (
    <div
      className="flex flex-row justify-between items-center bg-white bg-opacity-20 backdrop-blur-md p-3 rounded-md"
      key={id}
    >
      <div className="flex flex-row gap-3 items-center w-full">
        <img
          src={
            profile ||
            "https://search.pstatic.net/common?type=b&size=216&expire=1&refresh=true&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2Fportrait%2F202009%2F20200910113051466.jpg"
          }
          alt="director"
          className="w-[80px] h-[80px] rounded-full object-cover"
        />
        <div className="flex flex-col gap-2 w-full max-w-[calc(100%-100px)]">
          <Typography variant="body1">{name}</Typography>
          <div className="flex flex-row gap-2 max-w-full overflow-hidden whitespace-nowrap text-ellipsis">
            <span className="truncate">
              {movies.map((item) => item.title).join(", ")}
            </span>
          </div>
        </div>
      </div>
      <Typography variant="body2" className="w-[80px]">
        평균{" "}
        <span style={{ fontSize: "20px", fontWeight: "700" }}>{score}</span> 점
      </Typography>
    </div>
  );
};

export default ListItem;
