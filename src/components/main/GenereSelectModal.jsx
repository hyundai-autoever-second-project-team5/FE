import { Box, Button, Modal, Typography, useMediaQuery } from "@mui/material";
import React from "react";
import { useGetUserInfo } from "../../hook/useGetUserInfo";
import { getCookie } from "../../api/cookie";
import { postMovieSurvey } from "../../api/main";
import { useGetSurveyMovies } from "../../hook/useGetSurveyMovies";

const GenereSelectModal = ({ open, handleClose }) => {
  const isTablet = useMediaQuery("(max-width:680px)");
  const { data } = useGetUserInfo(getCookie("accessToken"));
  const { data: movies } = useGetSurveyMovies(getCookie("accessToken"));
  const [result, setResult] = React.useState([]);

  const handleMovieClick = (genreId) => {
    const id = Number(genreId);
    if (result.includes(id)) {
      setResult(result.filter((item) => item !== id));
    } else {
      setResult([...result, id]);
    }
  };

  const handlePostSurvey = () => {
    const genres = {
      genres: result,
    };
    console.log(genres);
    postMovieSurvey(genres).then((res) => {
      document.body.style.overflow = "auto";
      handleClose();
    });
  };

  // useEffect(() => {
  //   getMovieSurvey().then((res) => {
  //     setSurveyMovies(res);
  //   });
  // }, []);
  return (
    <Modal
      className="bg-black bg-opacity-40 backdrop-blur-sm"
      open={open}
      onClose={handleClose}
    >
      <Box
        className="bg-gray-200 bg-opacity-60 backdrop-blur-md gap-2"
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
        <Typography variant="h5" className="font-bold mb-2">
          {data?.nickname}님의 영화 취향 조사
        </Typography>
        <div className="grid grid-cols-4 gap-2 overflow-y-scroll h-[500px] mb-2">
          {movies?.map((item) => (
            <div
              key={item.genre_id}
              className={`relative cursor-pointer ${
                result.includes(item.genre_id)
                  ? "border-4 border-primary" // 선택된 이미지 스타일
                  : "border-2 border-transparent"
              }`}
              onClick={() => handleMovieClick(item.genre_id)}
            >
              <img
                src={item.poster_path}
                alt={item.poster_path}
                className="h-[200px] object-cover"
              />
              {result.includes(item.genre_id) && (
                <div className="absolute inset-0 bg-primary bg-opacity-50 flex items-center justify-center text-white font-bold">
                  <div className="w-10 h-10 rounded-full p-2 bg-white text-primary flex items-center justify-center text-lg">
                    {result.indexOf(item.genre_id) + 1} {/* 선택된 순서 표시 */}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="flex flex-row justify-end gap-2 mt-auto">
          <Button
            variant="contained"
            color="inherit"
            onClick={handlePostSurvey}
          >
            선택 완료
          </Button>
        </div>
      </Box>
    </Modal>
  );
};

export default GenereSelectModal;
