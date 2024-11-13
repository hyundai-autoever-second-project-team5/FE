// import React from 'react';
// import { Avatar } from "@mui/material";

// const Cast = ({ cast }) => {
//   return (
//     <div>
//       <strong className="block my-4 text-xl">출연진</strong>
//       <div className="flex items-center overflow-x-auto whitespace-nowrap">
//         {cast.slice(0, 5).map((actor) => (
//           <div
//             key={actor.cast_id}
//             className="flex flex-col items-center m-2 text-center"
//           >
//             <div className="flex justify-center">
//               <Avatar
//                 alt={actor.name}
//                 src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
//                 sx={{ width: 70, height: 70 }}
//                 className="mb-2"
//               />
//             </div>
//             <div>{actor.name}</div>
//             <div className="text-sm text-gray-400">{actor.character}</div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Cast;