import { useEffect, useState } from "react";
import Container from "../UI/Container";
import iconMessage from "../assets/icons/iconMessage.png";
import iconMagnifier from "../assets/icons/iconMagnifier.png";
import styles from "./DashBoard.module.css";
import MyResponsiveLine from "./MyResponsiveLine";
import {API_BASE_URL} from '../service/backend-config';

const DashBoard = () => {
  useEffect(() => {
    const api = async () => {
      const response = await fetch(`${API_BASE_URL}/result`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      console.log(data);
    };

    api();
  }, []);
  return (
    <div className={styles.dashboard}>
      <Container>
        <div>
          <div>
            <div className={styles.userInfo}>Hello, 회원님 👋🏻</div>
            <ul className={styles["overview-list"]}>
              <li className={styles["overview-item"]}>
                <div className={styles.icon}>
                  <img src={iconMessage} />
                </div>
                <div>
                  <p className={styles.title}>진단 받은 횟수</p>
                  <p className={styles.value}>4회</p>
                </div>
              </li>
              <li className={styles["overview-item"]}>
                <div className={styles.icon}>
                  <img src={iconMagnifier} />
                </div>
                <div>
                  <p className={styles.title}>최근 진단 결과</p>
                  <p className={styles.value}>건성</p>
                </div>
              </li>
              <li className={styles["overview-item"]}>
                <div className={styles.icon}>
                  <img src={iconMagnifier} />
                </div>
                <div>
                  <p className={styles.title}>최근 진단 결과</p>
                  <p className={styles.value}>건성</p>
                </div>
              </li>
            </ul>
          </div>
          <MyResponsiveLine className={styles["graph-line"]} />
        </div>
      </Container>
    </div>
  );
};

export default DashBoard;
