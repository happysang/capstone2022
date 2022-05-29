import ErrorMessage from "../components/ErrorMessage";

const ErrorPage = () => {
  useEffect(() => {
    const titleElement = document.getElementsByTagName("title")[0];
    titleElement.innerHTML =
      "두피 진단 에러 - ysl | AI를 활용한 두피 진단 플랫폼";
  }, []);

  return <ErrorMessage />;
};

export default ErrorPage;
