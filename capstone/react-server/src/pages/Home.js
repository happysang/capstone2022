import React, { useEffect } from "react";
import Main from "../components/Layout/Main";
import ServiceContent from "../components/Layout/ServiceContent";
import ServiceInfo from "../components/Layout/ServiceInfo";
import CallToAction from "../components/Layout/CallToAction";
import Footer from "../components/Layout/Footer";

const Home = () => {
  useEffect(() => {
    const titleElement = document.getElementsByTagName("title")[0];
    titleElement.innerHTML = "ysl | AI를 활용한 두피 진단 플랫폼";
  }, []);

  return (
    <React.Fragment>
      <Main />
      <ServiceInfo />
      <ServiceContent />
      <CallToAction />
      <Footer />
    </React.Fragment>
  );
};

export default Home;
