import axios from "axios";

export const getKakaoLogin = async () => {
  try {
    const response = await axios.get("/cinewall/auth/oauth2/kakao");
    return response.data;
  } catch (error) {
    console.error("Failed to login", error);
    throw error;
  }
};
