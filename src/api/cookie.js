import { Cookies } from "react-cookie";

const cookies = new Cookies();

// 쿠키에 값을 저장할 때
export const setCookie = (name, value, option = {}) => {
  return new Promise((resolve) => {
    cookies.set(name, value, {
      path: "/",
      secure: true, // HTTPS에서만 사용 가능
      sameSite: "None", // 다른 도메인에서도 쿠키 전송 허용
      // domain: ".cinewall.shop", // 특정 도메인 설정 (필요 시 변경)
      ...option,
    });
    resolve();
  });
};

// 쿠키에 있는 값을 꺼낼 때
export const getCookie = (name) => {
  return cookies.get(name);
};

// 쿠키를 지울 때
export const removeCookie = (name, option = {}) => {
  return new Promise((resolve) => {
    cookies.remove(name, {
      path: "/",
      secure: true,
      sameSite: "None",
      // domain: ".cinewall.shop", // 특정 도메인 설정 (필요 시 변경)
      ...option,
    });
    resolve();
  });
};
