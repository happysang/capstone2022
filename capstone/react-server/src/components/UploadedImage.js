import { useState } from "react";
import iconImage from "../assets/icons/iconImage.png";
import PreviewImage from "../modals/PreviewImage";
import styles from "./UploadedImage.module.css";

const UploadedImage = ({ file, onClickRemove }) => {
  const [previewIsShown, setPreviewIsShown] = useState(false);
  const [imgUrl, setImgUrl] = useState("");

  const showPreviewImageHandler = () => {
    setPreviewIsShown(true);

    const url = window.URL.createObjectURL(file);
    setImgUrl(url);
  };

  const hidePreviewImageHandler = () => {
    setPreviewIsShown(false);
  };

  return (
    <div className={styles.uploadedImage}>
      <div className={styles.icon}>
        <img src={iconImage} alt="icon" />
      </div>
      <div className={styles.detail}>
        <p className={styles.filename}>{file.name}</p>
        <button
          className={styles.preview}
          onClick={showPreviewImageHandler}
          type="button"
        >
          미리보기
        </button>
        {previewIsShown && (
          <PreviewImage url={imgUrl} onClose={hidePreviewImageHandler} />
        )}
      </div>
      <p className={styles.filesize}>{file.size}</p>
      <button className={styles.remove} onClick={onClickRemove} type="button">
        삭제
      </button>
    </div>
  );
};

export default UploadedImage;
