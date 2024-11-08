// import React from 'react'

// const MovieInfo = () => {
//   return (
//     <div>MovieInfo</div>
//   )
// }

// export default MovieInfo

import React from 'react';

const MovieInfo = ({
  title,
  releaseDate,
  rating,
  runtime,
  genres,
  description,
  posterUrl,
}) => {
  return (
    <div className="movie-info flex">
      <div className="w-1/3">
        <img src={posterUrl} alt={`${title} 포스터`} className="w-full h-auto" />
      </div>
      <div className="w-2/3 pl-6">
        <h1 className="text-4xl font-bold mb-4">{title}</h1>
        <div className="mb-4">
          <p>
            <strong>개봉일:</strong> {releaseDate}
          </p>
          <p>
            <strong>평점:</strong> {rating}
          </p>
          <p>
            <strong>러닝타임:</strong> {runtime}
          </p>
        </div>
        <div className="mb-4">
          <strong>장르:</strong> {genres}
        </div>
        <div>
          <strong>상세 정보:</strong>
          <p>{description}</p>
        </div>
      </div>
    </div>
  );
};

export default MovieInfo