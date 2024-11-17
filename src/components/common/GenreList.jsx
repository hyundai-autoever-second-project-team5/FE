import React from "react";
import GenreChip from "./GenreChip";

const GenreList = ({ isScrolled }) => {
  const data = ["호러", "로맨스", "판타지", "스릴러"];
  return (
    <div className=" bg-flex flex-row justify-between max-w-[1400px] w-full px-5">
      <div className="flex flex-row gap-2">
        {data?.map((item) => (
          <GenreChip text={item} />
        ))}
      </div>
    </div>
  );
};

export default GenreList;
