import React from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./pages/Home";
import MyPage from "./pages/MyPage";
import Detail from "./pages/Detail";
import Search from "./pages/Search";
import Kakao from "./pages/KakaoTemp";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "detail/:id",
        element: <Detail />,
      },
      {
        path: "mypage",
        element: <MyPage />,
      },
      {
        path: "search",
        element: <Search />,
      },
      {
        path: "kakao",
        element: <Kakao />,
      },
    ],
  },
]);

export default router;
