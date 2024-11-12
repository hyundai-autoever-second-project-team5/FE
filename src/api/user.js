import axios from "axios";
import client from "./client";

// 카카오 로그인
export const getKakaoLogin = async () => {
  try {
    const response = await client.get("/cinewall/auth/oauth2/kakao");
    return response.data;
  } catch (error) {
    console.error("Failed to kakao login", error);
    throw error;
  }
};

// 일반 로그인
export const postSignIn = async () => {
  try {
    const response = await client.post("/cinewall/auth/sign-in");
    return response.data;
  } catch (error) {
    console.error("Failed to login", error);
    throw error;
  }
};

// 일반 회원가입
export const postSignUp = async (userData) => {
  try {
    const response = await axios.post("/cinewall/auth/sign-up", userData);
    return response.data;
  } catch (error) {
    console.error("Failed to login", error);
    throw error;
  }
};
