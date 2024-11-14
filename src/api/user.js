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
export const postSignIn = async (loginData) => {
  try {
    const response = await client.post("/cinewall/auth/sign-in", loginData);
    return response.data;
  } catch (error) {
    console.error("Failed to login", error);
    throw error;
  }
};

// 아이디 중복 확인
export const postCheckId = async (id) => {
  try {
    const response = await client.post("/cinewall/auth/id-check", { id: id });
    return response.data;
  } catch (error) {
    console.error("Failed to check id", error);
    throw error;
  }
};

// 이메일 인증번호 전송
export const postCheckEmail = async (id, email) => {
  try {
    const response = await client.post("/cinewall/auth/sign-in", {
      id: id,
      email: email,
    });
    return response.data;
  } catch (error) {
    console.error("Failed to login", error);
    throw error;
  }
};

// 이메일 인증번호 확인
export const postCheckCertification = async (
  id,
  email,
  certificationNumber
) => {
  try {
    const response = await client.post("/cinewall/auth/sign-in", {
      id: id,
      email: email,
      certificationNumber: certificationNumber,
    });
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
