import React, { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import logo from "../../assets/images/Logo.png";
import iconMenu from "../../assets/icons/iconMenu.png";
import AuthContext from "../../store/auth-context";
import Button from "../../UI/Button";
import styles from "./Header.module.css";
import DrawerMenu from "../../modals/DrawerMenu";

const Header = () => {
  const navigate = useNavigate();
  const [isOpenedMenu, setIsOpenedMenu] = useState(false);
  const authCtx = useContext(AuthContext);
  const { isLoggedIn } = authCtx;

  const openMenuHandler = () => {
    setIsOpenedMenu(true);
  };

  const closeMenuHandler = () => {
    setIsOpenedMenu(false);
  };

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
      <div className={styles.menu} onClick={openMenuHandler}>
        <img src={iconMenu} />
      </div>
      {isOpenedMenu && (
        <DrawerMenu isOpened={isOpenedMenu} onClose={closeMenuHandler} />
      )}
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
        </ul>
        <div className={styles.buttons}>
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
                  styles.mypage,
                ].join(" ")}
                onClick={() => {
                  navigate("/mypage");
                }}
              >
                마이페이지
              </Button>
              <Button
                className={[
                  "darkblue",
                  styles["button-40"],
                  styles.logoutBtn,
                ].join(" ")}
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
