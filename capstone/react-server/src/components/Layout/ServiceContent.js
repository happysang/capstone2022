import Container from "../../UI/Container";
import imgPhone from "../../assets/images/imgPhoneInHand.png";
import imgGraphic from "../../assets/images/imgGraphic.png";
import imgMagnifier from "../../assets/images/imgMagnifier.png";

import styles from "./ServiceContent.module.css";

const ServiceContent = () => {
  return (
    <div className={styles.content}>
      <Container>
        <p className={styles.category}>Our Services</p>
        <h1 className={styles.title}>
          Handshake infographic mass market
          <br /> crowdfunding iteration.
        </h1>
        <div className={styles["card-wrapper"]}>
          <ul className={styles["card-list"]}>
            <li className={styles["card-item"]}>
              <div className={styles.card}>
                <div className={styles["card-image"]}>
                  <img src={imgPhone} />
                </div>
                <div className={styles.detail}>
                  <h3 className={styles["detail-title"]}>
                    한눈에 보기 쉬운 두피 상태 그래프
                  </h3>
                  <p className={styles["detail-desc"]}>
                    6가지 유형 중 어떤 유형에 해당하는지 확인할 수 있습니다.
                  </p>
                </div>
              </div>
            </li>
            <li className={styles["card-item"]}>
              <div className={styles.card}>
                <div className={styles["card-image"]}>
                  <img src={imgMagnifier} />
                </div>
                <div className={styles.detail}>
                  <h3 className={styles["detail-title"]}>
                    한눈에 보기 쉬운 두피 상태 그래프
                  </h3>
                  <p className={styles["detail-desc"]}>
                    6가지 유형 중 어떤 유형에 해당하는지 확인할 수 있습니다.
                  </p>
                </div>
              </div>
            </li>
            <li className={styles["card-item"]}>
              <div className={styles.card}>
                <div className={styles["card-image"]}>
                  <img src={imgGraphic} />
                </div>
                <div className={styles.detail}>
                  <h3 className={styles["detail-title"]}>
                    한눈에 보기 쉬운 두피 상태 그래프
                  </h3>
                  <p className={styles["detail-desc"]}>
                    6가지 유형 중 어떤 유형에 해당하는지 확인할 수 있습니다.
                  </p>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </Container>
    </div>
  );
};

export default ServiceContent;
