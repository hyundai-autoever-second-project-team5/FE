// Spotlight.jsx
import React, { useEffect, useRef, useState } from 'react';
import '../../styles/Spotlight.css';

const Spotlight = () => {
  const spotlightRef = useRef(null);
  const [isEventRunning, setIsEventRunning] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false); // 애니메이션 완료 여부 추적
  const [isCurtainOpen, setIsCurtainOpen] = useState(false); // 커튼 애니메이션 상태

  // 쿠키에서 값 가져오기
  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
  };

  useEffect(() => {
    // 애니메이션이 이미 실행되었는지 확인
    const spotlightShown = getCookie('spotlightShown') === 'true';
    if (spotlightShown) {
      setHasAnimated(true); // 애니메이션 건너뛰기
    }
  }, []);

  useEffect(() => {
    if (hasAnimated) return; // 이미 애니메이션이 실행된 경우 이벤트 리스너를 추가하지 않음

    const spotlight = spotlightRef.current;

    // 화면의 가로와 세로의 평균을 계산하는 함수
    const getScreenAvg = () => {
      return (window.innerWidth + window.innerHeight) / 2;
    };

    // 마우스 이동 핸들러
    const handleMouseMove = (event) => {
      if (isEventRunning) return; // 애니메이션 중인 경우 무시
      const x = event.clientX;
      const y = event.clientY;
      if (spotlight) {
        spotlight.style.background = `radial-gradient(
          circle 100px at ${x}px ${y}px,
          rgba(0, 0, 0, 0.01) 0%,
          rgba(0, 0, 0, 0.5) 70%,
          rgba(0, 0, 0, 0.96) 100%)`;
      }
    };

    // 클릭 핸들러
    const handleClick = (event) => {
      if (isEventRunning) return; // 애니메이션 중인 경우 무시
      setIsEventRunning(true);
      setIsCurtainOpen(true); // 커튼 애니메이션 시작

      // 애니메이션이 실행되었음을 쿠키에 저장 (세션 쿠키로 설정)
      document.cookie = 'spotlightShown=true; path=/';

      const x = event.clientX;
      const y = event.clientY;

      let i = 0;
      let j = 0;

      // Zoom In: 반지름을 점점 줄임
      const zoomIn = setInterval(() => {
        i += 1;
        const radius = getScreenAvg() * (0.2 - 0.001 * i);
        if (spotlight) {
          spotlight.style.background = `radial-gradient(
            circle ${radius}px at ${x}px ${y}px,
            rgba(0, 0, 0, 0.01) 0%,
            rgba(0, 0, 0, 0.5) 70%,
            rgba(0, 0, 0, 0.96) 100%)`;
        }
        if (i >= 100) {
          clearInterval(zoomIn);
          // Zoom Out 시작
          zoomOut();
        }
      }, 3);

      const zoomOut = () => {
        const zoomOutInterval = setInterval(() => {
          j += 1;
          const radius = getScreenAvg() * (0.1 + 0.02 * j);
          if (spotlight) {
            spotlight.style.background = `radial-gradient(
              circle ${radius}px at ${x}px ${y}px,
              rgba(0, 0, 0, 0.01) 0%,
              rgba(0, 0, 0, 0.5) 70%,
              rgba(0, 0, 0, 0.96) 100%)`;
          }
          if (j >= 100) {
            clearInterval(zoomOutInterval);
            setIsEventRunning(false);
            setHasAnimated(true); // 애니메이션 완료
          }
        }, 10);
      };

      // 애니메이션 시작 시 이벤트 리스너 제거
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('click', handleClick);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('click', handleClick);

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('click', handleClick);
    };
  }, [isEventRunning, hasAnimated]);

  // 애니메이션이 완료되면 Spotlight 컴포넌트를 렌더링하지 않음
  if (hasAnimated) {
    return null;
  }

  return (
    <>
      <div className="spotlight-overlay" ref={spotlightRef}></div>
      <div className={`curtain left ${isCurtainOpen ? 'open' : ''}`}></div>
      <div className={`curtain right ${isCurtainOpen ? 'open' : ''}`}></div>
    </>
  );
};

export default Spotlight;