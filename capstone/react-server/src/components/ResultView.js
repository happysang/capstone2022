import { useEffect, useState, useContext } from "react";
import MyResponsiveRadar from "./MyResponsiveRadar";
import styles from "./ResultView.module.css";
import { API_BASE_URL } from "../service/backend-config";
import datasets from "../result-data.json";
import AuthContext from "../store/auth-context";
import ProductList from "./ProductList";

const ResultView = () => {
  const [userResult, setUserResult] = useState("");
  const [isActive, setActive] = useState("1");
  const authCtx = useContext(AuthContext);
  const { token, id } = authCtx;

  const localstorage = JSON.parse(localStorage.getItem("RESULT"));
  const resultObj = {
    User_ID: localstorage.User_ID,
    result: localstorage.result,
    typeOfScalp: localstorage.typeOfScalp,
  };
  const type = resultObj.result; // 진단 결과 타입

  if (type !== userResult) {
    setUserResult(type);
  }

  const markHandler = (e) => {
    const markNum = e.target.dataset.slide;
    setActive(markNum);
  };

  let today = new Date();

  let year = String(today.getFullYear()).slice(2); // 년도
  let month = today.getMonth() + 1; // 월
  let date = today.getDate(); // 날짜
  let hours = ("0" + today.getHours()).slice(-2);
  let minutes = ("0" + today.getMinutes()).slice(-2);
  let seconds = ("0" + today.getSeconds()).slice(-2);

  let inspectionDate = `${year}/${month}/${date} ${hours}:${minutes}:${seconds}`;

  const obj = {
    user_id: id,
    date: inspectionDate,
    overallData: resultObj.result,
  };
  const data = resultObj.typeOfScalp.map((val) => val.value);

  data.forEach((val, idx) => {
    obj[`data${idx + 1}`] = String(Number(val).toFixed(2)) || 0;
  });

  useEffect(() => {
    let headers = {
      "Content-Type": "application/json",
    };
    if (token && token !== null) {
      headers = {
        ...headers,
        Authorization: "Bearer " + token,
      };
    }
    const api = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/result`, {
          method: "POST",
          headers,
          body: JSON.stringify(obj),
        });

        if (!response.ok) {
          throw new Error("에러 발생");
        }
      } catch (err) {
        console.error(err);
      }
    };

    api();
  }, [token]);

  const resultData = datasets[type];
  const { result } = resultData;
  const { summary } = resultData;
  const { treatments } = resultData;

  const { products } = resultData;

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>📊 진단결과</h1>
      <div className={styles.result}>
        <div className={styles.summary}>
          <h1>
            <strong className={styles.type}>{result}</strong>에 해당합니다.
          </h1>
          <p className={styles.detail}>{summary}</p>
        </div>
        <div className={styles["data-wrapper"]}>
          <MyResponsiveRadar data={resultObj} />
          <div className={styles.treatments}>
            <h1 className={styles["treatments-title"]}>관리법</h1>
            <div className={styles["treatments-list"]}>
              <div className={styles.tabs}>
                <div
                  className={[styles.tab, styles["tab-1"]].join(" ")}
                  data-slide={1}
                  onClick={markHandler}
                >
                  1
                </div>
                <div
                  className={[styles.tab, styles["tab-2"]].join(" ")}
                  data-slide={2}
                  onClick={markHandler}
                >
                  2
                </div>
                <div
                  className={[styles.tab, styles["tab-3"]].join(" ")}
                  data-slide={3}
                  onClick={markHandler}
                >
                  3
                </div>
              </div>
              {treatments.map((d, idx) => (
                <div
                  className={`${styles["treatments-item"]} ${
                    isActive === String(idx + 1) ? styles.active : ""
                  }`}
                  key={idx + 1}
                >
                  <div className={styles.content}>
                    <h3>{d.title}</h3>
                    <p>{d.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className={styles["recommendation-products"]}>
          <h1 className={styles.title}>맞춤 추천 상품</h1>
          <ProductList data={products} />
        </div>
      </div>
    </div>
  );
};

export default ResultView;
