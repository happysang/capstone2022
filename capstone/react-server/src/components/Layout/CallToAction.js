import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../store/auth-context";
import styles from "./CallToAction.module.css";
import Container from "../../UI/Container";
import Button from "../../UI/Button";

const CallToAction = () => {
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);
  const { isLoggedIn } = authCtx;

  const redirectHandler = () => {
    const redirectUrl = isLoggedIn ? "/upload" : "/login";
    navigate(redirectUrl);
  };

  return (
    <div className={styles.cta}>
      <Container>
        <div className={styles.background}>
          <div className={styles.content}>
            <h1 className={styles.title}>
              An enterprise template to ramp
              <br /> up your company website
            </h1>
            <Button
              className={["green", styles["button-60"]].join(" ")}
              onClick={redirectHandler}
            >
              시작하기
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default CallToAction;
