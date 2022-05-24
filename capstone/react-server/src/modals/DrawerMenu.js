import React, { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import Drawer from "../UI/Drawer";
import AuthContext from "../store/auth-context";
import Button from "../UI/Button";
import logo from "../assets/images/Logo.png";
import styles from "./DrawerMenu.module.css";

const DrawerMenu = ({ isOpened, onClose }) => {
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);
  const { isLoggedIn } = authCtx;

  const signupHandler = () => {
    onClose();
    navigate("/signup");
  };

  const loginHandler = () => {
    onClose();
    navigate("/login");
  };

  const logoutHandler = () => {
    onClose();
    authCtx.logout();
  };

  const redirectUrl = isLoggedIn ? "/upload" : "/login";

  return (
    <Drawer isOpened={isOpened} onClose={onClose}>
      <aside>
        <div className={styles.logo}>
          <img src={logo} />
        </div>
        <div className={styles.drawer}>
          <ul className={styles["drawer-menu-list"]}>
            <li className={styles["drawer-menu-item"]}>
              <Link to={"/"} onClick={onClose}>
                소개
              </Link>
            </li>
            <li className={styles["drawer-menu-item"]}>
              <Link to={redirectUrl} onClick={onClose}>
                두피진단
              </Link>
            </li>
            <li className={styles["drawer-menu-item"]}>
              <div>
                {!isLoggedIn && (
                  <div className={styles.buttons}>
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
                  <div className={styles.buttons}>
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
            </li>
          </ul>
        </div>
      </aside>
    </Drawer>
  );
};

export default DrawerMenu;
