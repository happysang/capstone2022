import { useEffect } from "react";
import ResultView from "../components/ResultView";

const Result = () => {
  useEffect(() => {
    const titleElement = document.getElementsByTagName("title")[0];
    titleElement.innerHTML = "진단 결과 - ysl | AI를 활용한 두피 진단 플랫폼";
  }, []);

  return <ResultView />;
};

export default Result;
