import React from 'react';
import Layout from '../common/Layout';

const MovieInfo = ({
  title,
  releaseDate,
  rating,
  runtime,
  genres,
  description,
  posterUrl,
  intro,
}) => {
  return (
    <Layout>
    <div className="flex px-5 py-8 text-white bg-black">
      <div className="relative w-2/6">
        <img
          src={
            "https://img.sbs.co.kr/newsnet/etv/upload/2023/10/10/30000880790.jpg"
          }
          alt={`${title} 포스터`}
          className="w-full h-auto"
        />
        <div className="absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-black to-transparent"></div>
      </div>
      <div className="w-2/4 pl-2">
        <h1 className="mb-4 text-4xl font-bold">스파이더맨: 홈커밍{title}</h1>
        <div className="flex items-center justify-between mb-2 ">
          <strong>| 개봉일: 2017.07.06</strong> {releaseDate}
          <strong>| 평점: 4.1</strong> {rating}
          <strong>| 러닝타임: 133분</strong> {runtime}
        </div>
        <div className="mb-4">
          <strong>| 장르: 액션/SF</strong> {genres}
        </div>
        <div>
          <strong>
            마블표 스파이더맨, 어벤져스에 합류하다? 스파이더맨 X 아이언맨 역대급
            꿀케미를 기대하라!
          </strong>
          {intro}
        </div>
        <div>
          {/* 상세정보 */}
          아이언맨 토니 스타크에게 발탁되어 시빌 워에서 활약했던 스파이더맨 피터
          파커는 어벤져스에 들어가고 싶은 혈기 넘치고 정의감 가득한 10대이다.
          그는 진정한 히어로로 거듭나 자신을 증명해 보이겠다는 욕심에 위험한
          일을 하지 말라는 토니 스타크의 충고를 어기고 강력한 적 벌쳐에게
          맞선다.
          <p>{description}</p>
        </div>
      </div>
    </div>
    </Layout>
  );
};

export default MovieInfo

// import React from 'react';

// const MovieInfo = ({
//   title,
//   releaseDate,
//   rating,
//   runtime,
//   genres,
//   description,
//   posterUrl,
//   intro,
// }) => {
//   return (
//     <div className="relative flex px-5 py-8 text-white bg-black">
//       <div className="relative w-2/6">
//         <img
//           src="https://img.sbs.co.kr/newsnet/etv/upload/2023/10/10/30000880790.jpg"
//           alt={`${title} 포스터`}
//           className="w-full h-auto"
//         />
//         {/* 그라데이션 오버레이 */}
//         <div className="absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-black to-transparent"></div>
//       </div>
//       {/* 텍스트 영역 */}
//       <div className="absolute top-0 right-0 flex flex-col w-2/4 h-full pl-6">
//         <h1 className="mb-4 text-4xl font-bold">스파이더맨: 홈커밍 {title}</h1>
//         <div className="flex items-center justify-between mb-2">
//           <strong>| 개봉일: 2017.07.06</strong> {releaseDate}
//           <strong>| 평점: 4.1</strong> {rating}
//           <strong>| 러닝타임: 133분</strong> {runtime}
//         </div>
//         <div className="mb-4">
//           <strong>| 장르: 액션/SF</strong> {genres}
//         </div>
//         <div>
//           <strong>마블표 스파이더맨, 어벤져스에 합류하다? 스파이더맨 X 아이언맨 역대급 꿀케미를 기대하라!</strong> {intro}
//         </div>
//         <div>
//           {/* 상세정보 */}
//           아이언맨 토니 스타크에게 발탁되어 시빌 워에서 활약했던
//           스파이더맨 피터 파커는 어벤져스에 들어가고 싶은 혈기 넘치고 정의감
//           가득한 10대이다. 그는 진정한 히어로로 거듭나 자신을 증명해
//           보이겠다는 욕심에 위험한 일을 하지 말라는 토니 스타크의 충고를
//           어기고 강력한 적 벌쳐에게 맞선다.
//           <p>{description}</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MovieInfo;