import { useEffect, useState } from "react";
import MyResponsiveRadar from "./MyResponsiveRadar";
import TinySlider from "tiny-slider-react";
import styles from "./ResultView.module.css";
import { API_BASE_URL } from "../service/backend-config";
import datasets from "../result-data.json";

const ResultView = () => {
  const [isActive, setActive] = useState("1");
  // const [data, setData] = useState("");

  const localstorage = JSON.parse(localStorage.getItem("RESULT"));
  const resultObj = {
    User_ID: localstorage.User_ID,
    result: localstorage.result,
    typeOfScalp: localstorage.typeOfScalp,
  };
  const type = resultObj.result; // 진단 결과 타입
  console.log('res', resultObj);
  console.log(type);

  const markHandler = (e) => {
    const markNum = e.target.dataset.slide;
    console.log(markNum);
    console.log(`${isActive === String(1) ? "isActive" : "none"}`);
    setActive(markNum);

  };

  const obj = {};
  const data = resultObj.typeOfScalp.map((val) => 
     val.value
 )

 data.forEach((val, idx) => {
   obj[`data${idx+1}`] = val || 0;
 })

 console.log(data);
 console.log(obj);

  useEffect(() => {
    // const data = localStorage.getItem("RESULT");

    const api = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/result`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(obj),
        });

        if (!response.ok) {
        }
        console.log(response);
      } catch (err) {
        console.log(err.message);
      }
    };

    api();
  }, []);

  const resultData = datasets[type];
  const { result } = resultData;
  const { summary } = resultData;
  const { treatments } = resultData;

  const { products } = resultData;
  console.log(products);

  const settings = {
    // container: "#responsive",
    container: ".product-card",
    items: 1,
    center: true,
    controlsText: ["<", ">"],
    mouseDrag: true,
    loop: true,
    swipeAngle: false,
    speed: 400,
    gutter: 20,
    responsive: {
      350: {
        items: 3,
        controls: true,
        edgePadding: 30,
      },
      500: {
        items: 4,
      },
    },
  };

  const clickEvent = (slide) => {
    console.log(slide);
  };

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
          <div className={styles["product-list"]}>
            <TinySlider settings={settings} onInit={clickEvent}>
              {products.map((item, index) => (
                <div key={index} className={styles["product-card"]}>
                  <a href={item.url} target="_blank">
                    <div className={styles["product-img"]}>
                      <img src={item.img} alt="product-image" />
                    </div>
                    <div className={styles["product-content"]}>
                      <p className={styles.brand}>{item.brand}</p>
                      <h3 className={styles.name}>{item.name}</h3>
                      <p className={styles.price}>
                        <strong>{item.price.toLocaleString()}</strong>원
                      </p>
                    </div>
                  </a>
                </div>
              ))}
            </TinySlider>
            {/* {products.map((item) => (
              <div className={styles["product-card"]}>
                <a href={item.url} target="_blank">
                  <div className={styles["product-img"]}>
                    <img src={item.img} alt="product-image" />
                  </div>
                  <div className={styles["product-content"]}>
                    <p className={styles.brand}>{item.brand}</p>
                    <h3 className={styles.name}>{item.name}</h3>
                    <p className={styles.price}>
                      <strong>{item.price.toLocaleString()}</strong>원
                    </p>
                  </div>
                </a>
              </div>
            ))} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultView;