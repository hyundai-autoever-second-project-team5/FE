import React, { useEffect } from "react";
import GenreChip from "./GenreChip";
import { getGenreTags } from "../../api/main";
import { useSearchParams } from "react-router-dom";

const GenreList = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [genres, setGenres] = React.useState([]);
  const selectedGenre = searchParams.get("genre");

  const handleChange = (newValue) => {
    setSearchParams({ genre: newValue }); // 쿼리 파라미터에 탭 정보 저장
  };

  useEffect(() => {
    getGenreTags().then((res) => {
      console.log("ddd", res);
      setGenres(res);
    });
  }, []);
  return (
    <div className=" bg-flex flex-row justify-between max-w-[1400px] w-full px-5">
      <div className="flex flex-row gap-2">
        {genres &&
          Object.values(genres)?.map((item) => (
            <GenreChip
              text={item}
              handleChange={() => {
                console.log("item", item);
                handleChange(item);
              }}
              isSelected={selectedGenre === item}
            />
          ))}
      </div>
    </div>
  );
};

export default GenreList;
