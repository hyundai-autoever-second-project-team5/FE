import axios from "axios";

// 현재 환경에 따라 baseURL 설정

const BASE_URL =
  window.location.hostname === "localhost" ? ""
    : "https://api.cinewall.shop";

const client = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    // 여기에서 필요한 추가 헤더를 설정할 수 있습니다.
  },
  withCredentials: true, // 쿠키 및 인증 정보 전송을 위해 설정
});

export default client;


