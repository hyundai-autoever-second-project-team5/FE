import logo from "./logo.svg";
import "./App.css";
import { Outlet } from "react-router-dom";
import Header from "./components/common/Header";
import Layout from "./components/common/Layout";

function App() {
  return (
    <>
      {/* <Layout> */}
        <Header />
        <Outlet />
      {/* </Layout> */}
    </>
  );
}

export default App;
