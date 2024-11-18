// import axios from "axios";

// const PROXY = window.location.hostname === "localhost" ? "" : "/proxy";
// const URL = `${PROXY}`;

// const client = axios.create({
//   baseURL: URL,
//   headers: {
//     "Content-Type": "application/json",
//     // "Access-Control-Allow-Origin": "http://3.38.104.1:8080",
//     // "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
//     "Access-Control-Allow-Credentials": "true",
//   },
//   withCredentials: true,
// });

// export default client;
import axios from "axios";

const client = axios.create({
  baseURL: "https://api.cinewall.shop",
  withCredentials: true, // 쿠키를 포함한 요청을 위해 추가
});

export default client;
