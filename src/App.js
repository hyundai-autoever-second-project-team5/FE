import "./App.css";
import { Outlet } from "react-router-dom";
import Header from "./components/common/Header";
import Layout from "./components/common/Layout";
import Footer from "./components/common/Footer";
import ScrollToTop from "./components/common/ScrollToTop";

function App() {
  return (
    <>
      <Layout>
        <Header />
        <ScrollToTop />
        <Outlet />
        <Footer />
      </Layout>
    </>
  );
}

export default App;
