// Spotlight.jsx
import React, { useEffect, useRef, useState, useCallback } from 'react';
import '../../styles/Spotlight.css';

const Spotlight = () => {
  const spotlightRef = useRef(null);
  const [isEventRunning, setIsEventRunning] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false); // 애니메이션 완료 여부 추적
  const [isCurtainOpen, setIsCurtainOpen] = useState(false); // 커튼 애니메이션 상태

  // 화면의 가로와 세로의 평균을 계산하는 함수
  const getScreenAvg = () => {
    return (window.innerWidth + window.innerHeight) / 2;
  };

  // 마우스 이동 핸들러
  const handleMouseMove = useCallback(
    (event) => {
      if (isEventRunning || hasAnimated) return; // 애니메이션 중이거나 이미 실행된 경우 무시
      const x = event.clientX;
      const y = event.clientY;
      const spotlight = spotlightRef.current;
      if (spotlight) {
        spotlight.style.background = `radial-gradient(
          circle 100px at ${x}px ${y}px,
          rgba(0, 0, 0, 0.01) 0%,
          rgba(0, 0, 0, 0.5) 70%,
          rgba(0, 0, 0, 0.96) 100%)`;
      }
    },
    [isEventRunning, hasAnimated]
  );

  // 클릭 핸들러
  const handleClick = useCallback(
    (event) => {
      if (isEventRunning || hasAnimated) return; // 애니메이션 중이거나 이미 실행된 경우 무시
      setIsEventRunning(true);
      setHasAnimated(true); // 애니메이션 실행 상태 설정
      setIsCurtainOpen(true); // 커튼 애니메이션 시작

      const x = event.clientX;
      const y = event.clientY;
      const spotlight = spotlightRef.current;

      if (!spotlight) {
        setIsEventRunning(false);
        return;
      }

      let i = 0;
      let j = 0;

      // Zoom In: 반지름을 점점 줄임
      const zoomIn = setInterval(() => {
        i += 1;
        const radius = getScreenAvg() * (0.2 - 0.001 * i);
        spotlight.style.background = `radial-gradient(
          circle ${radius}px at ${x}px ${y}px,
          rgba(0, 0, 0, 0.01) 0%,
          rgba(0, 0, 0, 0.5) 70%,
          rgba(0, 0, 0, 0.96) 100%)`;
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
          spotlight.style.background = `radial-gradient(
            circle ${radius}px at ${x}px ${y}px,
            rgba(0, 0, 0, 0.01) 0%,
            rgba(0, 0, 0, 0.5) 70%,
            rgba(0, 0, 0, 0.96) 100%)`;
          if (j >= 100) {
            clearInterval(zoomOutInterval);
            setIsEventRunning(false);
            // 애니메이션 완료 후 이벤트 리스너 다시 추가하지 않음
          }
        }, 10);
      };

      // 애니메이션 시작 시 이벤트 리스너 제거
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('click', handleClick);
    },
    [isEventRunning, hasAnimated, handleMouseMove]
  );

  useEffect(() => {
    if (!isEventRunning && !hasAnimated) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('click', handleClick);
    }

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('click', handleClick);
    };
  }, [isEventRunning, hasAnimated, handleMouseMove, handleClick]);

  return (
    <>
      <div className="spotlight-overlay" ref={spotlightRef}></div>
      <div className={`curtain left ${isCurtainOpen ? 'open' : ''}`}></div>
      <div className={`curtain right ${isCurtainOpen ? 'open' : ''}`}></div>
    </>
  );
};

export default Spotlight;