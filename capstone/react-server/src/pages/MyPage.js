import React, { useEffect } from "react";
import DashBoard from "../components/DashBoard";
import Footer from "../components/Layout/Footer";

const MyPage = () => {
  useEffect(() => {
    const titleElement = document.getElementsByTagName("title")[0];
    titleElement.innerHTML = "마이페이지 - ysl | AI를 활용한 두피 진단 플랫폼";
  }, []);

  return (
    <React.Fragment>
      <DashBoard />
      <Footer />
    </React.Fragment>
  );
};

export default MyPage;
