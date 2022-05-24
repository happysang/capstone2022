import { useEffect } from "react";
import LoginForm from "../components/LoginForm";

const Login = () => {
  useEffect(() => {
    const titleElement = document.getElementsByTagName("title")[0];
    titleElement.innerHTML = "로그인 - ysl | AI를 활용한 두피 진단 플랫폼";
  }, []);

  return <LoginForm />;
};

export default Login;
