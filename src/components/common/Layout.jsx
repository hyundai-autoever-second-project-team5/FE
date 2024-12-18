import React from "react";

const Layout = ({ children }) => {
  return (
    <div
      className="relative w-full bg-center bg-contain"
      style={{
        backgroundImage: `url('/images/wall.jpg')`,
      }}
    >
      {/* 배경을 위한 오버레이 */}
      <div className="absolute inset-0 bg-black pointer-events-none opacity-60"></div>

      {/* 실제 콘텐츠 */}
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default Layout;