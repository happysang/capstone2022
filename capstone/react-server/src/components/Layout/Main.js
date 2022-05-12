import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../store/auth-context";
import mainImg from "../../assets/images/img-main.png";
import Button from "../../UI/Button";
import Container from "../../UI/Container";
import styles from "./Main.module.css";

const Main = () => {
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);
  const { isLoggedIn } = authCtx;

  const redirectHandler = () => {
    const redirectUrl = isLoggedIn ? "/upload" : "/login";
    navigate(redirectUrl);
  };

  return (
    <main className={styles["main"]}>
      <Container>
        <div className={styles["main-wrapper"]}>
          <div className={styles["main-left"]}>
            <h1 className={styles.title}>
              당신의 두피는
              <br /> 어떤 상태인가요?
            </h1>
            <p className={styles.detail}>
              집에서 간편하고 빠르게 두피 유형을 알아보세요.
            </p>
            <Button
              className={["darkblue", styles["button-60"]].join(" ")}
              onClick={redirectHandler}
            >
              시작하기
            </Button>
          </div>
          <div className={styles["main-right"]}>
            <img className={styles["img-graph"]} src={mainImg} />
          </div>
        </div>
      </Container>
    </main>
  );
};

export default Main;
