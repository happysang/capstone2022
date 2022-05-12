import React from "react";
import Main from "../components/Layout/Main";
import ServiceContent from "../components/Layout/ServiceContent";
import ServiceInfo from "../components/Layout/ServiceInfo";
import CallToAction from "../components/Layout/CallToAction";
import Footer from "../components/Layout/Footer";

const Home = () => {
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
