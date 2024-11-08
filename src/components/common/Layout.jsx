import React from "react";

const Layout = ({ children }) => {
  return (
    <div
      className="bg-contain bg-center w-full px-3"
      style={{
        backgroundImage: `url('/images/wall.png')`,
      }}
    >
      <div className="inset-0 bg-black opacity-30">{children}</div>
    </div>
  );
};

export default Layout;
