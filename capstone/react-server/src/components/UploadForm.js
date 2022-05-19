import { useState, useEffect } from "react";
import iconUpload from "../assets/icons/iconUpload.png";
import UploadedImage from "./UploadedImage";
import styles from "./UploadForm.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Spinner from "./Spinner";
import { API_BASE_URL } from "../service/backend-config";

const UploadForm = () => {
  const navigate = useNavigate();
  const [imageFile, setImageFile] = useState("");
  const [isloaded, setIsLoaded] = useState(false);
  const [isSpinner, setIsSpinner] = useState(false);
  const [fileIsValid, setFileIsValid] = useState(true);

  // useEffect(() => {
  //   localStorage.setItem("RESULT", null);
  // }, []);

  // useEffect(() => {
  //   const obj = {
  //     data: 3,
  //     name: "userName",
  //   };

  //   const api = async () => {
  //     const response = await fetch(`${API_BASE_URL}/result`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(obj),
  //     });

  //     console.log(response);
  //   };

  //   api();
  // }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [isSpinner]);

  const submitHandler = (e) => {
    e.preventDefault();
    setIsSpinner(true);

    const imgChange = async () => {
      console.log("imagechange");

      const formData = new FormData();
      formData.append("file", imageFile);

      for (const keyValue of formData) console.log(keyValue);
      console.log(...formData);

      try {
        const response = await axios({
          method: "POST",
          url: "http://localhost:5000/test",
          data: formData,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        console.log("res", response);
        if (response.status !== 200) {
          throw new Error("에러 발생");
        }

        // flask에서 받아온 데이터를 localStorage에 저장
        const data = JSON.stringify(response.data);
        localStorage.setItem("RESULT", data);

        setIsSpinner(false);
        navigate("/result");
      } catch (err) {
        console.error(err);
      }
    };
    imgChange();
  };

  const imageChangeHandler = (e) => {
    if (!e.target.value) return;
    setImageFile([]);
    setIsLoaded(false);

    const formData = new FormData();

    console.log(e.target.files);
    const uploadFile = e.target.files[0];
    formData.append("file", uploadFile);

    setImageFile(uploadFile);
    console.log("pre", isloaded);
    setIsLoaded((prevState) => !prevState);
    console.log("cur", isloaded);
    console.log(imageFile);
    console.log(uploadFile);
    console.log(uploadFile.name);
    console.log("state", imageFile);

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
    <div>
      {isSpinner && <Spinner />}
      {!isSpinner && (
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
                <p className={styles.title}>이곳에 이미지를 업로드해주세요.</p>
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
      )}
      {/* {imageUrl && (
        <img style={{ width: "500px", height: "auto" }} src={imageUrl} />
      )} */}
    </div>
  );
};

export default UploadForm;
