import { useNavigate } from "react-router-dom";
import { ReactComponent as ImgNotFound } from "../assets/images/imgNotFound.svg";
import styles from "./NotFoundMessage.module.css";

const NotFoundMessage = () => {
  const navigate = useNavigate();

  const redirectPreviousPageHandler = () => {
    navigate(-1);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.message}>
        <div className={styles["error-img"]}>
          <ImgNotFound />
        </div>
        <h1>해당 페이지를 찾을 수 없습니다.</h1>
        <p>주소가 잘못되었거나 더 이상 제공되지 않는 페이지입니다.</p>
      </div>
      <button
        className={styles["previous-btn"]}
        onClick={redirectPreviousPageHandler}
      >
        이전 페이지
      </button>
    </div>
  );
};

export default NotFoundMessage;
