import React from "react";
import Modal from "../UI/Modal";
import styles from "./PreviewImage.module.css";

const PreviewImage = ({ url, onClose }) => {
  return (
    <Modal onClose={onClose}>
      <div className={styles.previewImg}>
        <img src={url} />
      </div>
    </Modal>
  );
};

export default PreviewImage;
