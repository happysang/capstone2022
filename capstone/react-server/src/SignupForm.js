import React, { useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
// react-router-dom 버전 낮음 -> useNavigate()로 변경하기
// import { ReactComponent as IconEye } from "../assets/icons/iconEye.svg";
// import { ReactComponent as IconEyeHidden } from "../assets/icons/iconEyeHidden.svg";
import AuthContext from "./auth-context";
import styles from "./SignupForm.module.css";

const SignupForm = () => {
  const history = useHistory();
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

  let formIsVaild = false;

  const checkValidForm = (valid, touch) => {
    for (const i in valid) {
      console.log(valid[i]);
      if (!valid[i]) {
        formIsVaild = false;
        return;
      }
    }
    // for (const i in touch) {
    //   console.log(i, touch[i]);
    //   if (!touch[i]) {
    //     formIsVaild = false;
    //     return;
    //   }
    // }
    formIsVaild = true;
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

  const genderInputBlurHandler = () => {
    setInputsTouch((prevState) => {
      return {
        ...prevState,
        gender: true,
      };
    });
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
    if (enteredPassword1.trim() === "") {
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

  // const iconButtonClickHandler = (e) => {
  //   console.log(e.target.closest("button").dataset.icon);
  //   console.log(e.target.dataset.icon);
  //   if (e.target.closest("button").dataset.icon === "1") {
  //     setIsVisible1((prevState) => !prevState);
  //   } else {
  //     setIsVisible2((prevState) => !prevState);
  //   }
  // };

  const submitHandler = (e) => {
    e.preventDefault();

    checkValidForm(inputsValidity, inputsTouch);
    if (!formIsVaild) return;

    console.log("submit");

    const userData = {
      username: enteredName,
      age: enteredAge,
      gender: enteredGender,
      email: enteredEmail,
      password: enteredPassword1,
    };

    authCtx.signup(userData);
  };

  const nameInputIsInVaild = !inputsValidity.name && inputsTouch.name;
  const ageInputIsInVaild = !inputsValidity.age && inputsTouch.age;
  const emailInputIsInVaild = !inputsValidity.email && inputsTouch.email;
  const password1InputIsInVaild =
    !inputsValidity.password1 && inputsTouch.password1;
  const password2InputIsInVaild =
    !inputsValidity.password2 && inputsTouch.password2;

  const nameControlClasses = `${styles.control} ${
    nameInputIsInVaild ? styles.invalid : ""
  }`;

  const ageControlClasses = `${styles.control} ${
    ageInputIsInVaild ? styles.invalid : ""
  }`;

  const emailControlClasses = `${styles.control} ${
    emailInputIsInVaild ? styles.invalid : ""
  }`;

  const password1ControlClasses = `${styles.control} ${
    password1InputIsInVaild ? styles.invalid : ""
  }`;

  const password2ControlClasses = `${styles.control} ${
    password2InputIsInVaild ? styles.invalid : ""
  }`;

  return (
    <div className={styles.wrapper}>
      <form className={styles.form} onSubmit={submitHandler}>
        <h1>회원가입</h1>
        <div className={nameControlClasses}>
          <label htmlFor="name">이름</label>
          <div className={styles.input}>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="이름"
              onChange={nameInputChangeHandler}
              onBlur={nameInputBlurHandler}
              value={enteredName}
            />
            {!inputsValidity.name && (
              <p className={styles["error-message"]}>이름을 입력해주세요</p>
            )}
          </div>
        </div>
        <div className={ageControlClasses}>
          <label htmlFor="age">생년월일</label>
          <div className={styles.input}>
            <input
              type="text"
              id="age"
              name="age"
              placeholder="생년월일 (6자리)"
              onChange={ageInputChangeHandler}
              onBlur={ageInputBlurHandler}
              value={enteredAge}
              maxLength="6"
            />
            {!inputsValidity.age && (
              <p className={styles["error-message"]}>
                생년월일은 6자리여야 합니다.
              </p>
            )}
          </div>
        </div>
        <div className={styles.control}>
          <label htmlFor="gender">성별</label>
          <div className={`${styles.input} ${styles.gender}`}>
            <select
              id="gender"
              defaultValue="default"
              onChange={genderInputChangeHandler}
            >
              <option value="default" disabled>
                성별
              </option>
              <option value="M">남자</option>
              <option value="F">여자</option>
            </select>
          </div>
        </div>
        <div className={emailControlClasses}>
          <label htmlFor="email">아이디</label>
          <div className={styles.input}>
            <input
              type="text"
              id="email"
              name="email"
              placeholder="아이디"
              onChange={emailInputChangeHandler}
              onBlur={emailInputBlurHandler}
              value={enteredEmail}
            />
            {!inputsValidity.email && (
              <p className={styles["error-message"]}>아이디를 입력해주세요</p>
            )}
          </div>
        </div>
        <div className={password1ControlClasses}>
          <label htmlFor="password1">비밀번호</label>
          <div className={styles.input}>
            <input
              type={!isVisible1 ? "password" : "text"}
              id="password1"
              name="password1"
              placeholder="비밀번호 (영문, 숫자 6-10자)"
              onChange={password1InputChangeHandler}
              onBlur={password1InputBlurHandler}
              value={enteredPassword1}
            />
            {/* <button
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
            </button> */}
            {!inputsValidity.password1 && (
              <p className={styles["error-message"]}>
                비밀번호는 영문, 숫자를 포함하여 6자 이상이어야 합니다.
              </p>
            )}
          </div>
        </div>
        <div className={password2ControlClasses}>
          <label htmlFor="password2">비밀번호 확인</label>
          <div className={styles.input}>
            <input
              type={!isVisible2 ? "password" : "text"}
              id="password2"
              name="password2"
              placeholder="비밀번호 확인"
              onChange={password2InputChangeHandler}
              onBlur={password2InputBlurHandler}
              value={enteredPassword2}
            />
            {/* <button
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
            </button> */}
            {!inputsValidity.password2 && (
              <p className={styles["error-message"]}>
                비밀번호가 일치하지 않습니다.
              </p>
            )}
          </div>
        </div>
        <button className={styles["submit-button"]}>회원가입</button>
      </form>
      <p className={styles["signup-link"]}>
        이미 계정이 있으신가요?
        <Link to="/login">로그인</Link>
      </p>
    </div>
  );
};

export default SignupForm;
