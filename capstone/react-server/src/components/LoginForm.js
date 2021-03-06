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

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    const enteredEmailIsValid = !isEmpty(enteredEmail);
    const enteredPasswordIsValid = !isEmpty(enteredPassword);

    const userData = {
      email: enteredEmail,
      password: enteredPassword,
    };

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
        <h1>?????????</h1>
        <p className={styles.content}>
          Sign in and start managing your scalp condition!
        </p>
        <div className={emailControlClasses}>
          <label className={styles["sr-only"]} htmlFor="email">
            ?????????
          </label>
          <input
            type="text"
            id="email"
            name="email"
            placeholder="?????????"
            ref={emailInputRef}
          />
          {!InputsValidity.email && (
            <p className={styles["error-message"]}>???????????? ??????????????????</p>
          )}
        </div>
        <div className={passwordControlClasses}>
          <label className={styles["sr-only"]} htmlFor="password">
            ????????????
          </label>
          <input
            type={!isVisible ? "password" : "text"}
            id="password"
            name="password"
            placeholder="????????????"
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
            <p className={styles["error-message"]}>??????????????? ??????????????????</p>
          )}
        </div>
        <button className={styles["submit-button"]}>?????????</button>
      </form>

      <div className={styles["find-wrapper"]}>
        <Link to="/signup">????????????</Link>
      </div>

      <div className={styles.terms}>
        <span>
          ???????????? ??? ysl??? ????????? ?????? ???<br />
          ???????????? ??????????????? ??????????????????, ???????????????.
        </span>
      </div>
    </div>
  );
};

export default LoginForm;
