import { Typography } from "@mui/material";
import React from "react";

const ListItem = () => {
  return (
    <div className="flex flex-row justify-between items-center bg-white bg-opacity-20 backdrop-blur-md p-3 rounded-md">
      <div className="flex flex-row gap-3 items-center">
        <img
          src="https://search.pstatic.net/common?type=b&size=216&expire=1&refresh=true&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2Fportrait%2F202009%2F20200910113051466.jpg"
          alt="director"
          className="w-[80px] h-[80px] rounded-full object-cover"
        />
        <div className="flex flex-col gap2">
          <Typography variant="body1">봉준호</Typography>
          <div className="flex flex-row">
            <Typography variant="body2">설국역찰, 기생충, 마더</Typography>
          </div>
        </div>
      </div>
      <Typography variant="body2">
        평균 <span style={{ fontSize: "20px", fontWeight: "700" }}>3.5</span> 점
      </Typography>
    </div>
  );
};

export default ListItem;
