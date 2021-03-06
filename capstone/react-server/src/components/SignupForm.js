import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { ReactComponent as IconEye } from "../assets/icons/iconEye.svg";
import { ReactComponent as IconEyeHidden } from "../assets/icons/iconEyeHidden.svg";
import AuthContext from "../store/auth-context";
import styles from "./SignupForm.module.css";

const SignupForm = () => {
  const authCtx = useContext(AuthContext);
  const [enteredName, setEnteredName] = useState("");
  const [enteredAge, setEnteredAge] = useState("");
  const [enteredGender, setEnteredGender] = useState("");
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredPassword1, setEnteredPassword1] = useState("");
  const [enteredPassword2, setEnteredPassword2] = useState("");
  const [isVisible1, setIsVisible1] = useState(false);
  const [isVisible2, setIsVisible2] = useState(false);
  const [inputsTouch, setInputsTouch] = useState({
    name: false,
    age: false,
    gender: false,
    email: false,
    password1: false,
    password2: false,
  });

  const [inputsValidity, setInputsValidity] = useState({
    name: true,
    age: true,
    gender: true,
    email: true,
    password1: true,
    password2: true,
  });

  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    localStorage.setItem("USER_INFO", null);
  }, []);

  const checkValidForm = () => {
    setInputsValidity((prevState) => {
      return {
        ...prevState,
        name: enteredName.length ? true : false,
        age: enteredAge.length ? true : false,
        gender: enteredGender.length ? true : false,
        email: enteredEmail.length ? true : false,
        password1: enteredPassword1.length ? true : false,
        password2: enteredPassword2.length ? true : false,
      };
    });

    for (let touch in inputsTouch) {
      if (inputsTouch[touch]) continue;
      else return false;
    }

    for (let vaild in inputsValidity) {
      if (inputsValidity[vaild]) continue;
      else return false;
    }
    return true;
  };

  // Change Handler
  const nameInputChangeHandler = (e) => {
    setEnteredName(e.target.value);
    if (e.target.value.trim() !== "") {
      setInputsValidity((prevState) => {
        return {
          ...prevState,
          name: true,
        };
      });
    }
  };

  const ageInputChangeHandler = (e) => {
    setEnteredAge(e.target.value);
    if (e.target.value.trim() !== "" && e.target.value.trim().length === 6) {
      setInputsValidity((prevState) => {
        return {
          ...prevState,
          age: true,
        };
      });
    }
  };

  const genderInputChangeHandler = (e) => {
    setEnteredGender(e.target.value);
    setInputsTouch((prevState) => {
      return {
        ...prevState,
        gender: true,
      };
    });
  };

  const emailInputChangeHandler = (e) => {
    setEnteredEmail(e.target.value);
    if (e.target.value.trim() !== "") {
      setInputsValidity((prevState) => {
        return {
          ...prevState,
          email: true,
        };
      });
    }
  };

  const password1InputChangeHandler = (e) => {
    setEnteredPassword1(e.target.value);
    if (e.target.value.trim() !== "") {
      setInputsValidity((prevState) => {
        return {
          ...prevState,
          password1: true,
        };
      });
    }
  };

  const password2InputChangeHandler = (e) => {
    setEnteredPassword2(e.target.value);
    if (e.target.value.trim() !== "") {
      setInputsValidity((prevState) => {
        return {
          ...prevState,
          password2: true,
        };
      });
    }
  };

  // Blur Handler
  const nameInputBlurHandler = () => {
    setInputsTouch((prevState) => {
      return {
        ...prevState,
        name: true,
      };
    });
    if (enteredName.trim() === "") {
      setInputsValidity((prevState) => {
        return {
          ...prevState,
          name: false,
        };
      });
    }
  };

  const ageInputBlurHandler = () => {
    setInputsTouch((prevState) => {
      return {
        ...prevState,
        age: true,
      };
    });
    if (enteredAge.trim() === "" || enteredAge.trim().length < 6) {
      setInputsValidity((prevState) => {
        return {
          ...prevState,
          age: false,
        };
      });
    }
  };

  const emailInputBlurHandler = () => {
    setInputsTouch((prevState) => {
      return {
        ...prevState,
        email: true,
      };
    });
    if (enteredEmail.trim() === "") {
      setInputsValidity((prevState) => {
        return {
          ...prevState,
          email: false,
        };
      });
    }
  };

  const password1InputBlurHandler = () => {
    setInputsTouch((prevState) => {
      return {
        ...prevState,
        password1: true,
      };
    });

    let vaild = false;
    const pw = enteredPassword1;
    const num = pw.search(/[0-9]/g);
    const eng = pw.search(/[a-z]/gi);
    const spe = pw.search(/[`~!@@#$%^&*|?????????'???";:???/?]/gi);

    if (pw.length < 6 || pw.length > 10) {
      setErrorMessage("6?????? ~ 10?????? ????????? ??????????????????.");
    } else if (pw.search(/\s/) !== -1) {
      setErrorMessage("??????????????? ???????????? ??????????????????.");
    } else if (num < 0 || eng < 0 || spe < 0) {
      setErrorMessage("??????, ??????, ??????????????? ???????????? ??????????????????.");
    } else {
      setErrorMessage("");
      vaild = true;
    }

    if (!vaild || enteredPassword1.trim() === "") {
      setInputsValidity((prevState) => {
        return {
          ...prevState,
          password1: false,
        };
      });
    }
  };

  const password2InputBlurHandler = () => {
    setInputsTouch((prevState) => {
      return {
        ...prevState,
        password2: true,
      };
    });
    if (
      enteredPassword2.trim() === "" ||
      enteredPassword2 !== enteredPassword1
    ) {
      setInputsValidity((prevState) => {
        return {
          ...prevState,
          password2: false,
        };
      });
    }
  };

  const iconButtonClickHandler = (e) => {
    if (e.target.closest("button").dataset.icon === "1") {
      setIsVisible1((prevState) => !prevState);
    } else {
      setIsVisible2((prevState) => !prevState);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();

    let formIsVaild = checkValidForm();
    if (!formIsVaild) return;

    const userData = {
      username: enteredName,
      age: enteredAge,
      gender: enteredGender,
      email: enteredEmail,
      password: enteredPassword1,
    };

    localStorage.setItem("USER_INFO", enteredName);

    authCtx.signup(userData);
  };

  const nameControlClasses = `${styles.control} ${
    !inputsValidity.name ? styles.invalid : ""
  }`;

  const ageControlClasses = `${styles.control} ${
    !inputsValidity.age ? styles.invalid : ""
  }`;

  const emailControlClasses = `${styles.control} ${
    !inputsValidity.email ? styles.invalid : ""
  }`;

  const password1ControlClasses = `${styles.control} ${
    !inputsValidity.password1 && errorMessage ? styles.invalid : ""
  }`;

  const password2ControlClasses = `${styles.control} ${
    !inputsValidity.password2 ? styles.invalid : ""
  }`;

  return (
    <div className={styles.wrapper}>
      <form className={styles.form} onSubmit={submitHandler}>
        <h1>????????????</h1>
        <div className={nameControlClasses}>
          <label htmlFor="name">??????</label>
          <div className={styles.input}>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="??????"
              onChange={nameInputChangeHandler}
              onBlur={nameInputBlurHandler}
              value={enteredName}
            />
            {!inputsValidity.name && (
              <p className={styles["error-message"]}>????????? ??????????????????</p>
            )}
          </div>
        </div>
        <div className={ageControlClasses}>
          <label htmlFor="age">????????????</label>
          <div className={styles.input}>
            <input
              type="text"
              id="age"
              name="age"
              placeholder="???????????? (6??????)"
              onChange={ageInputChangeHandler}
              onBlur={ageInputBlurHandler}
              value={enteredAge}
              maxLength="6"
            />
            {!inputsValidity.age && (
              <p className={styles["error-message"]}>
                ??????????????? 6???????????? ?????????.
              </p>
            )}
          </div>
        </div>
        <div className={styles.control}>
          <label htmlFor="gender">??????</label>
          <div className={`${styles.input} ${styles.gender}`}>
            <select
              id="gender"
              defaultValue="default"
              onChange={genderInputChangeHandler}
            >
              <option value="default" disabled>
                ??????
              </option>
              <option value="M">??????</option>
              <option value="F">??????</option>
            </select>
          </div>
        </div>
        <div className={emailControlClasses}>
          <label htmlFor="email">?????????</label>
          <div className={styles.input}>
            <input
              type="text"
              id="email"
              name="email"
              placeholder="?????????"
              onChange={emailInputChangeHandler}
              onBlur={emailInputBlurHandler}
              value={enteredEmail}
            />
            {!inputsValidity.email && (
              <p className={styles["error-message"]}>???????????? ??????????????????</p>
            )}
          </div>
        </div>
        <div className={password1ControlClasses}>
          <label htmlFor="password1">????????????</label>
          <div className={styles.input}>
            <input
              type={!isVisible1 ? "password" : "text"}
              id="password1"
              name="password1"
              placeholder="???????????? (??????, ??????, ???????????? ?????? 6-10???)"
              onChange={password1InputChangeHandler}
              onBlur={password1InputBlurHandler}
              value={enteredPassword1}
            />
            <button
              className={styles["icon-eye"]}
              type="button"
              onClick={iconButtonClickHandler}
              data-icon="1"
            >
              {!isVisible1 ? (
                <IconEyeHidden fill="#0a2640" />
              ) : (
                <IconEye fill="#0a2640" />
              )}
            </button>
            {errorMessage && !inputsValidity.password1 && (
              <p className={styles["error-message"]}>{errorMessage}</p>
            )}
          </div>
        </div>
        <div className={password2ControlClasses}>
          <label htmlFor="password2">???????????? ??????</label>
          <div className={styles.input}>
            <input
              type={!isVisible2 ? "password" : "text"}
              id="password2"
              name="password2"
              placeholder="???????????? ??????"
              onChange={password2InputChangeHandler}
              onBlur={password2InputBlurHandler}
              value={enteredPassword2}
            />
            <button
              className={styles["icon-eye"]}
              type="button"
              onClick={iconButtonClickHandler}
              data-icon="2"
            >
              {!isVisible2 ? (
                <IconEyeHidden fill="#0a2640" />
              ) : (
                <IconEye fill="#0a2640" />
              )}
            </button>
            {!inputsValidity.password2 && (
              <p className={styles["error-message"]}>
                ??????????????? ???????????? ????????????.
              </p>
            )}
          </div>
        </div>
        <button className={styles["submit-button"]}>????????????</button>
      </form>
      <p className={styles["signup-link"]}>
        ?????? ????????? ????????????????
        <Link to="/login">?????????</Link>
      </p>
    </div>
  );
};

export default SignupForm;
