import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { setCookie } from "../../src/api/cookie";

function KakaoTemp() {
  const navigate = useNavigate();

  useEffect(() => {
    // URL에서 쿼리 파라미터 추출
    const params = new URLSearchParams(window.location.search);
    const accessToken = params.get("AccessToken");

    if (accessToken) {
      // AccessToken을 쿠키에 저장
      setCookie("accessToken", accessToken);

      // 서버에 사용자 정보 요청
      fetch("https://api.cinewall.shop/cinewall/user/info", {
        method: "GET",
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch user info");
          }
          return response.json();
        })
        .then((data) => {
          // 사용자 정보를 메인 페이지로 전달
          navigate("/", { state: { userInfo: data } });
        })
        .catch((error) => {
          console.error("Error fetching user info:", error);
          // alert("사용자 정보를 가져오는 데 실패했습니다.");
          navigate("/"); // 오류 시 메인 페이지로 이동
        });
    } else {
      alert("AccessToken이 없습니다.");
      navigate("/"); // AccessToken이 없으면 메인 페이지로 이동
    }
  }, [navigate]);

  return (
    <div>
      <h1>로그인 처리 중입니다...</h1>
    </div>
  );
}

export default KakaoTemp;
