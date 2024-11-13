import logo from "./logo.svg";
import "./App.css";
import { Outlet } from "react-router-dom";
import Header from "./components/common/Header";
import Layout from "./components/common/Layout";
import Footer from "./components/common/Footer";

function App() {
  return (
    <>
      <Layout>
        <Header />
        <Outlet />
        <Footer />
      </Layout>
    </>
  );
}

export default App;
