import { useRef, useState, useContext } from "react";
import { Link } from "react-router-dom";
import styles from "./LoginForm.module.css";
import { ReactComponent as IconEye } from "../assets/icons/iconEye.svg";
import { ReactComponent as IconEyeHidden } from "../assets/icons/iconEyeHidden.svg";
import AuthContext from "../store/auth-context";

const isEmpty = (value) => value.trim() === "";

const LoginForm = () => {
  const authCtx = useContext(AuthContext);
  const [userData, setUserData] = useState({ email: "", password: "" });
  const [isWrittenPassword, setIsWrittenPassword] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [InputsValidity, setInputsValidity] = useState({
    email: true,
    password: true,
  });

  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const passwordInputChangeHandler = (e) => {
    if (e.target.value) {
      setIsWrittenPassword(true);
    }
  };

  const iconButtonClickHandler = () => {
    setIsVisible((prevState) => !prevState);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    console.log("submit");

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    const enteredEmailIsValid = !isEmpty(enteredEmail);
    const enteredPasswordIsValid = !isEmpty(enteredPassword);

    const userData = {
      email: enteredEmail,
      password: enteredPassword,
    };

    console.log(userData);

    setInputsValidity({
      email: enteredEmailIsValid,
      password: enteredPasswordIsValid,
    });

    const formIsValid = enteredEmailIsValid && enteredPasswordIsValid;

    if (!formIsValid) {
      if (!enteredEmailIsValid) {
        emailInputRef.current.focus();
      } else {
        passwordInputRef.current.focus();
      }
      return;
    }

    authCtx.login(userData);
  };

  const emailControlClasses = `${styles.control} ${
    InputsValidity.email ? "" : styles.invalid
  }`;

  const passwordControlClasses = `${styles.control} ${
    InputsValidity.password ? "" : styles.invalid
  }`;

  const iconButton = !isVisible ? (
    <IconEyeHidden fill="#0a2640" />
  ) : (
    <IconEye fill="#0a2640" />
  );

  return (
    <div className={styles.wrapper}>
      <form className={styles.form} onSubmit={submitHandler}>
        <h1>로그인</h1>
        <p className={styles.content}>
          Sign in and start managing your scalp condition!
        </p>
        <div className={emailControlClasses}>
          <label className={styles["sr-only"]} htmlFor="email">
            이메일
          </label>
          <input
            type="text"
            id="email"
            name="email"
            placeholder="이메일"
            ref={emailInputRef}
          />
          {!InputsValidity.email && (
            <p className={styles["error-message"]}>이메일을 입력해주세요</p>
          )}
        </div>
        <div className={passwordControlClasses}>
          <label className={styles["sr-only"]} htmlFor="password">
            비밀번호
          </label>
          <input
            type={!isVisible ? "password" : "text"}
            id="password"
            name="password"
            placeholder="비밀번호"
            ref={passwordInputRef}
            onChange={passwordInputChangeHandler}
          />
          {isWrittenPassword ? (
            <button
              className={styles["icon-eye"]}
              type="button"
              onClick={iconButtonClickHandler}
            >
              {iconButton}
            </button>
          ) : (
            ""
          )}
          {!InputsValidity.password && (
            <p className={styles["error-message"]}>비밀번호를 입력해주세요</p>
          )}
        </div>
        <button className={styles["submit-button"]}>로그인</button>
      </form>
      <ul className={styles["find-wrapper"]}>
        <li>
          <a>비밀번호 찾기</a>
        </li>
        <li>
          <a>이메일 찾기</a>
        </li>
        <li>
          <Link to="/signup">회원가입</Link>
        </li>
      </ul>
      <div className={styles.terms}>
        <span>
          회원가입 시 brand의 서비스 약관 및<br />
          개인정보 처리방침을 확인하였으며, 동의합니다.
        </span>
      </div>
    </div>
  );
};

export default LoginForm;
