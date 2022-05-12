import React, { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import logo from "../../assets/images/Logo.png";
import AuthContext from "../../store/auth-context";
import Button from "../../UI/Button";
import styles from "./Header.module.css";

const Header = () => {
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);
  const { isLoggedIn } = authCtx;

  const signupHandler = () => {
    navigate("/signup");
  };

  const loginHandler = () => {
    navigate("/login");
  };

  const logoutHandler = () => {
    authCtx.logout();
  };

  const redirectUrl = isLoggedIn ? "/upload" : "/login";

  return (
    <header className={styles.header}>
      <div>
        <Link to={"/"}>
          <img className={styles.logo} src={logo} />
        </Link>
      </div>
      <nav className={styles.nav}>
        <ul className={styles.list}>
          <li className={styles.item}>
            <Link to={"/"}>소개</Link>
          </li>
          <li className={styles.item}>
            <Link to={redirectUrl}>두피진단</Link>
          </li>
          <li className={styles.item}>
            <Link to={"/"}>제품구매</Link>
          </li>
        </ul>
        <div>
          {!isLoggedIn && (
            <div>
              <Button
                className={[
                  "transparent",
                  styles["button-40"],
                  styles["button-right-pad"],
                ].join(" ")}
                onClick={loginHandler}
              >
                로그인
              </Button>
              <Button
                className={["darkblue", styles["button-40"]].join(" ")}
                onClick={signupHandler}
              >
                회원가입
              </Button>
            </div>
          )}
          {isLoggedIn && (
            <div>
              <Button
                className={[
                  "transparent",
                  styles["button-40"],
                  styles["button-right-pad"],
                ].join(" ")}
                onClick={() => {
                  navigate("/mypage");
                }}
              >
                마이페이지
              </Button>
              <Button
                className={["darkblue", styles["button-40"]].join(" ")}
                onClick={logoutHandler}
              >
                로그아웃
              </Button>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default React.memo(Header);
