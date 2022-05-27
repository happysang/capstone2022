import { useEffect, useContext, useState } from "react";
import Container from "../UI/Container";
import iconMessage from "../assets/icons/iconMessage.png";
import iconMagnifier from "../assets/icons/iconMagnifier.png";
import styles from "./DashBoard.module.css";
import MyResponsiveLine from "./MyResponsiveLine";
import { API_BASE_URL } from "../service/backend-config";
import AuthContext from "../store/auth-context";
import datasets from "../result-data.json";

const initialData = [
  {
    color: "hsl(301, 70%, 50%)",
    id: "모낭사이홍반",
    data: [
      {
        x: "22-05-19",
        y: 0.5,
      },
      {
        x: "22-05-20",
        y: 0.4,
      },
      {
        x: "22-05-21",
        y: 0.43,
      },
      {
        x: "22-05-22",
        y: 0.45,
      },
    ],
  },
  {
    id: "모낭홍반농포",
    color: "hsl(16, 70%, 50%)",
    data: [
      {
        x: "22-05-19",
        y: 0.2,
      },
      {
        x: "22-05-20",
        y: 0.3,
      },
      {
        x: "22-05-21",
        y: 0.4,
      },
      {
        x: "22-05-22",
        y: 0.2,
      },
    ],
  },
  {
    id: "미세각질",
    color: "hsl(239, 70%, 50%)",
    data: [
      {
        x: "22-05-19",
        y: 0.4,
      },
      {
        x: "22-05-20",
        y: 0.2,
      },
      {
        x: "22-05-21",
        y: 0.2,
      },
      {
        x: "22-05-22",
        y: 0.3,
      },
    ],
  },
  {
    id: "비듬",
    color: "hsl(165, 70%, 50%)",
    data: [
      {
        x: "22-05-19",
        y: 0.3,
      },
      {
        x: "22-05-20",
        y: 0.4,
      },
      {
        x: "22-05-21",
        y: 0.4,
      },
      {
        x: "22-05-22",
        y: 0.3,
      },
    ],
  },
  {
    id: "탈모",
    color: "hsl(350, 70%, 50%)",
    data: [
      {
        x: "22-05-19",
        y: 0.4,
      },
      {
        x: "22-05-20",
        y: 0.5,
      },
      {
        x: "22-05-21",
        y: 0.43,
      },
      {
        x: "22-05-22",
        y: 0.32,
      },
    ],
  },
  {
    id: "피지과다",
    color: "hsl(100, 70%, 50%)",
    data: [
      {
        x: "22-05-19",
        y: 0.24,
      },
      {
        x: "22-05-20",
        y: 0.3,
      },
      {
        x: "22-05-21",
        y: 0.4,
      },
      {
        x: "22-05-22",
        y: 0.33,
      },
    ],
  },
];

const DashBoard = () => {
  const [userData, setUserData] = useState(initialData);
  const [dataCount, setDataCount] = useState(0);
  const [latestResult, setLatestResult] = useState("");
  const [manyResult, setManyResult] = useState("");
  const [manyCount, setManyCount] = useState(0);
  const authCtx = useContext(AuthContext);
  const { token } = authCtx;

  let data = [];
  let count = 0;
  let latest = "";
  let many = "";
  let manyCnt = 0;

  const type = [
    "모낭사이홍반",
    "모낭홍반농포",
    "미세각질",
    "비듬",
    "탈모",
    "피지과다",
  ];

  useEffect(() => {
    let headers = {
      "Content-Type": "application/json",
    };
    if (token && token !== null) {
      headers = {
        ...headers,
        Authorization: "Bearer " + token,
      };
      console.log("headers", headers);
    }
    const api = async () => {
      const response = await fetch(`${API_BASE_URL}/result`, {
        method: "GET",
        headers,
      });

      const user = await response.json();
      console.log(user);

      const dataList = user.data;
      count = dataList.length;
      console.log("cu", count);
      latest = datasets[dataList[dataList.length - 1].overallData].result;
      console.log("la", latest);

      if (count === 0) return;

      let value = [];
      let obj = {};

      dataList.map((val) => {
        obj[val.overallData] = (obj[val.overallData] || 0) + 1;
      });

      let maxList = Object.entries(obj).sort((a, b) => b[1] - a[1]);
      let keyValue = maxList[0][0];
      manyCnt = maxList[0][1];
      many = datasets[keyValue].result;

      for (let i = 0; i < type.length; i++) {
        let v = dataList.map((val) => {
          return {
            x: `${val.date}`,
            y: +Number(val[`data${i + 1}`]).toFixed(2),
          };
        });
        value.push(v);
      }
      console.log(value);

      for (let i = 0; i < type.length; i++) {
        const color = Math.floor(Math.random() * 360);
        let v = {
          id: type[i],
          color: `hsl(${color}, 70%, 50%)`,
          data: value[i],
        };
        data.push(v);
      }

      console.log(data);
      setUserData(data);
      setDataCount(count);
      setLatestResult(latest);
      setManyResult(many);
      setManyCount(manyCnt);
    };

    api();
  }, []);

  return (
    <div className={styles.dashboard}>
      <Container>
        <div>
          <div className={styles["user-content"]}>
            <div className={styles.userInfo}>Hello, 회원님 👋🏻</div>
            <ul className={styles["overview-list"]}>
              <li className={styles["overview-item"]}>
                <div className={styles.icon}>
                  <img src={iconMessage} />
                </div>
                <div>
                  <p className={styles.title}>진단 받은 횟수</p>
                  <p className={styles.value}>{dataCount}회</p>
                </div>
              </li>
              <li className={styles["overview-item"]}>
                <div className={styles.icon}>
                  <img src={iconMagnifier} />
                </div>
                <div>
                  <p className={styles.title}>최근 진단 결과</p>
                  <p className={styles.value}>{latestResult}</p>
                </div>
              </li>
              <li className={styles["overview-item"]}>
                <div className={styles.icon}>
                  <img src={iconMagnifier} />
                </div>
                <div>
                  <p className={styles.title}>
                    총 {dataCount}번 중 <br />
                    {manyCount}번의 진단 결과
                  </p>
                  <p className={styles.value}>{manyResult}</p>
                </div>
              </li>
            </ul>
          </div>
          <MyResponsiveLine
            userData={userData}
            className={styles["graph-line"]}
          />
        </div>
      </Container>
    </div>
  );
};

export default DashBoard;
