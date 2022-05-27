import { useNavigate } from "react-router-dom";
import { ReactComponent as ImgWarning } from "../assets/images/imgWarning.svg";
import styles from "./ErrorMessage.module.css";

const ErrorMessage = () => {
  const navigate = useNavigate();

  const redirectPreviousPageHandler = () => {
    navigate("/upload");
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.message}>
        <div className={styles["error-img"]}>
          <ImgWarning />
        </div>
        <h1>해당 이미지의 진단을 진행할 수 없습니다.</h1>
        <p>두피 사진이 아니거나 유효한 사진이 아닙니다.</p>
      </div>
      <button
        className={styles["previous-btn"]}
        onClick={redirectPreviousPageHandler}
      >
        다시 진단하기
      </button>
    </div>
  );
};

export default ErrorMessage;
