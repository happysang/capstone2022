import Container from "../../UI/Container";
import styles from "./ServiceInfo.module.css";

const ServiceInfo = () => {
  return (
    <div className={styles.info}>
      <Container>
        <p className={styles.category}>깊이 있는 분석</p>
        <h1 className={styles.title}>
          Handshake infographic mass market
          <br /> crowdfunding iteration.
        </h1>
        <ul className={styles["info-list"]}>
          <li className={styles["info-item"]}>
            <p>100K</p>
            <span>구축 이미지 데이터</span>
          </li>
          <li className={styles["info-item"]}>
            <p>10.000</p>
            <span>구축 이미지 데이터</span>
          </li>
          <li className={styles["info-item"]}>
            <p>97%</p>
            <span>정확성</span>
          </li>
        </ul>
      </Container>
    </div>
  );
};

export default ServiceInfo;
