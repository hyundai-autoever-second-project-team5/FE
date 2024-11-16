import { getCookie } from "./cookie";

export const createEventSource = (url) => {
  // const token = getCookie("accessToken");
  const token = getCookie("accessToken") || "valid-token"; // 테스트용 기본 토큰
  const eventSource = new EventSource(`${url}?token=${token}`);
  eventSource.onopen = () => console.log("SSE connection opened"); // 추가된 로그
  eventSource.onerror = (error) => console.error("SSE error:", error); // 추가된 로그
  return eventSource;
};
