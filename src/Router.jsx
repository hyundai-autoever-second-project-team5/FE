import React from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./pages/Home";
import MyPage from "./pages/MyPage";
import Detail from "./pages/Detail";

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
    ],
  },
]);

export default router;
