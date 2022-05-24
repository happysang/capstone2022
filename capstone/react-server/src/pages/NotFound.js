import { useEffect } from "react";
import NotFoundMessage from "../components/NotFoundMessage";

const NotFound = () => {
  useEffect(() => {
    const titleElement = document.getElementsByTagName("title")[0];
    titleElement.innerHTML =
      "찾을 수 없는 페이지 - ysl | AI를 활용한 두피 진단 플랫폼";
  }, []);

  return <NotFoundMessage />;
};

export default NotFound;
