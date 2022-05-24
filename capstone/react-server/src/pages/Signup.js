import { useEffect } from "react";
import SignupForm from "../components/SignupForm";

const Signup = () => {
  useEffect(() => {
    const titleElement = document.getElementsByTagName("title")[0];
    titleElement.innerHTML = "회원가입 - ysl | AI를 활용한 두피 진단 플랫폼";
  }, []);

  return <SignupForm />;
};

export default Signup;
