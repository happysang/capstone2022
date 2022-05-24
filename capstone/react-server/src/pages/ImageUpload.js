import React, { useEffect } from "react";
import Footer from "../components/Layout/Footer";
import UploadField from "../components/Layout/UploadField";
const ImageUpload = () => {
  useEffect(() => {
    const titleElement = document.getElementsByTagName("title")[0];
    titleElement.innerHTML =
      "이미지 업로드 - ysl | AI를 활용한 두피 진단 플랫폼";
  }, []);

  return (
    <React.Fragment>
      <UploadField />
      <Footer />
    </React.Fragment>
  );
};

export default ImageUpload;
