import Container from "../../UI/Container";
import iconCheck from "../../assets/icons/iconCheck.png";
import imgContent1 from "../../assets/images/img-serviceContent1.png";
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
        {/* <div className={styles["content-list"]}>
          <div className={styles["content-item"]}>
            <div className={styles["content-left"]}>
              <img src={imgContent1} />
            </div>
            <div className={styles["content-right"]}>
              <h3 className={styles["content-title"]}>
                한눈에 보기 쉬운 <br />
                두피 상태 그래프
              </h3>
              <ul className={styles["content-detail-list"]}>
                <li className={styles["content-detail-item"]}>
                  <img src={iconCheck} />
                  <p>6가지 유형으로 알아보는 두피 상태</p>
                </li>
                <li className={styles["content-detail-item"]}>
                  <img src={iconCheck} />
                  <p>두피 유형에 따른 관리법</p>
                </li>
                <li className={styles["content-detail-item"]}>
                  <img src={iconCheck} />
                  <p>예방법</p>
                </li>
              </ul>
            </div>
          </div>
          <div className={styles["content-item"]}>
            <div className={styles["content-left"]}>
              <img src={imgContent1} />
            </div>
            <div className={styles["content-right"]}>
              <h3 className={styles["content-title"]}>
                지속적으로 두피 상태를 기록
              </h3>
              <div>
                <ul className={styles["content-detail-list"]}>
                  <li className={styles["content-detail-item"]}>
                    <img src={iconCheck} />
                    <p>6가지 유형으로 알아보는 두피 상태</p>
                  </li>
                  <li className={styles["content-detail-item"]}>
                    <img src={iconCheck} />
                    <p>두피 유형에 따른 관리법</p>
                  </li>
                  <li className={styles["content-detail-item"]}>
                    <img src={iconCheck} />
                    <p>예방법</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className={styles["content-item"]}>
            <div className={styles["content-left"]}>
              <img src={imgContent1} />
            </div>
            <div className={styles["content-right"]}>
              <h3 className={styles["content-title"]}>
                We connect our customers with the best, and help them keep
                up-and stay open.
              </h3>
              <ul className={styles["content-detail-list"]}>
                <li className={styles["content-detail-item"]}>
                  <img src={iconCheck} />
                  <p>6가지 유형으로 알아보는 두피 상태</p>
                </li>
                <li className={styles["content-detail-item"]}>
                  <img src={iconCheck} />
                  <p>두피 유형에 따른 관리법</p>
                </li>
                <li className={styles["content-detail-item"]}>
                  <img src={iconCheck} />
                  <p>예방법</p>
                </li>
              </ul>
            </div>
          </div>
        </div> */}
      </Container>
    </div>
  );
};

export default ServiceContent;
