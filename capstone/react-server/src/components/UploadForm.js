import React, { useState, useEffect } from "react";
import iconUpload from "../assets/icons/iconUpload.png";
import UploadedImage from "./UploadedImage";
import styles from "./UploadForm.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Spinner from "./Spinner";

const UploadForm = () => {
  const navigate = useNavigate();
  const [imageFile, setImageFile] = useState("");
  const [isloaded, setIsLoaded] = useState(false);
  const [isSpinner, setIsSpinner] = useState(false);
  const [fileIsValid, setFileIsValid] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    localStorage.setItem("RESULT", null);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [isSpinner]);

  useEffect(() => {
    if (error) navigate("/error");
  }, [error, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    setIsSpinner(true);

    const imgChange = async () => {
      const formData = new FormData();
      formData.append("file", imageFile);

      // for (const keyValue of formData) console.log(keyValue);
      // console.log(...formData);

      try {
        const response = await axios({
          method: "POST",
          url: "http://localhost:5000/test",
          data: formData,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        if (response.status === 500) {
          // setError(true);
          throw new Error("유효한 사진이 아닙니다.");
        }
        if (response.status !== 200) {
          // setError(true);
          throw new Error("에러 발생");
        }

        // flask에서 받아온 데이터를 localStorage에 저장
        const data = JSON.stringify(response.data);
        localStorage.setItem("RESULT", data);

        setIsSpinner(false);
        navigate("/result");
      } catch (err) {
        console.error(err);
        setError(true);
      }
    };
    imgChange();
  };

  const imageChangeHandler = (e) => {
    if (!e.target.value) return;
    setImageFile([]);
    setIsLoaded(false);

    const formData = new FormData();
    const uploadFile = e.target.files[0];
    formData.append("file", uploadFile);

    setImageFile(uploadFile);
    setIsLoaded((prevState) => !prevState);

    const reg = /(.*?)\.(jpg|jpeg|png)$/;
    const filename = uploadFile.name;

    if (!filename.match(reg)) {
      setFileIsValid(false);
      return;
    }

    setFileIsValid(true);
  };

  const imageRemoveHandler = () => {
    setImageFile([]);
    setIsLoaded(false);
    setFileIsValid(false);
  };

  return (
    <div className={styles["upload-form"]}>
      {isSpinner && <Spinner />}
      {!isSpinner && (
        <React.Fragment>
          <div className={styles.notice}>
            <h1 className={styles["notice-title"]}>사진 업로드시 주의사항</h1>
            <ul className={styles["notice-list"]}>
              <li className={styles["notice-item"]}>
                <p className={styles.desc}>
                  <strong>첫번째.</strong>플래시를 이용해 두피가 잘 보이도록
                  촬영한 사진이어야 합니다.
                </p>
              </li>
              <li className={styles["notice-item"]}>
                <p className={styles.desc}>
                  <strong>두번째.</strong>머리카락이 아닌 두피에 초점을 맞춰
                  촬영한 사진이어야 합니다.
                </p>
              </li>
              <li className={styles["notice-item"]}>
                <p className={styles.desc}>
                  <strong>세번째.</strong>두피를 위주로 확대한 사진은 더 정확한
                  진단을 받을 수 있습니다.
                </p>
              </li>
            </ul>
          </div>
          <form className={styles.form} onSubmit={submitHandler}>
            <div className={styles["form-wrapper"]}>
              <input
                type="file"
                id="notification"
                name="notification"
                accept="image/jpg, image/png, image/jpeg"
                onChange={imageChangeHandler}
                disabled={isloaded && fileIsValid}
              />
              <div className={styles["content-wrapper"]}>
                <div className={styles.icon}>
                  <img src={iconUpload} alt="icon" />
                </div>
                <label htmlFor="notification">
                  <p className={styles.title}>
                    이곳에 이미지를 업로드해주세요.
                  </p>
                  <p className={styles.detail}>
                    .jpg, .jpeg, .png 확장자 파일만 가능합니다.
                  </p>
                </label>
              </div>
            </div>
            {imageFile && fileIsValid && (
              <UploadedImage
                file={imageFile}
                onClickRemove={imageRemoveHandler}
              />
            )}
            {!fileIsValid && isloaded && (
              <div className={styles["wrong-filetype"]}>
                <p>이미지 파일만 업로드 가능합니다.</p>
              </div>
            )}
            <button
              className={["green", styles["submit-btn"]].join(" ")}
              disabled={!isloaded || !fileIsValid}
            >
              진단하기
            </button>
          </form>
        </React.Fragment>
      )}
    </div>
  );
};

export default UploadForm;
