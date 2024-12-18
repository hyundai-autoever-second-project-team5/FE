import client from "./client";

// 카카오 로그인
export const getKakaoLogin = async () => {
  try {
    const response = await client.get(`/cinewall/auth/oauth2/kakao`);
    return response.data;
  } catch (error) {
    console.error("Failed to kakao login", error);
    throw error;
  }
};

// 일반 로그인
export const postSignIn = async (loginData) => {
  try {
    const response = await client.post(`/cinewall/auth/sign-in`, loginData);
    return response;
  } catch (error) {
    console.error("Failed to sign in", error);
    throw error;
  }
};

// 로그아웃
export const postSignOut = async (loginData) => {
  try {
    const response = await client.post(`/cinewall/auth/logout`);
    return response;
  } catch (error) {
    console.error("Failed to sign out", error);
    throw error;
  }
};

// 일반 회원가입
export const postSignUp = async (userData) => {
  try {
    const response = await client.post(`/cinewall/auth/sign-up`, userData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Failed to sign up", error);
    throw error;
  }
};

// 아이디 중복 확인
export const postCheckId = async (id) => {
  try {
    const response = await client.post(`/cinewall/auth/id-check`, {
      id: id,
    });
    return response.data;
  } catch (error) {
    console.error("Failed to check id", error);
    throw error;
  }
};

// 이메일 인증번호 전송
export const postCheckEmail = async (id, email) => {
  try {
    const response = await client.post(`/cinewall/auth/email-certification`, {
      id: id,
      email: email,
    });
    return response.data;
  } catch (error) {
    console.error("Failed to check email", error);
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
    const response = await client.post(`/cinewall/auth/check-certification`, {
      id: id,
      email: email,
      certificationNumber: certificationNumber,
    });
    return response.data;
  } catch (error) {
    console.error("Failed to check certification", error);
    throw error;
  }
};

// 유저 정보 조회
export const getUserInfo = async () => {
  try {
    const response = await client.get(`/cinewall/user/info`);
    return response.data;
  } catch (error) {
    console.error("Failed to get user info", error);
    throw error;
  }
};

// 사용자 프로필 수정
export const patchProfileEdit = async (profileData) => {
  try {
    const response = await client.patch(`/cinewall/user/edit`, profileData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Failed to post profile", error);
    throw error;
  }
};
