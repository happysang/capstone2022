import { ResponsiveLine } from "@nivo/line";
import { useState, useEffect } from "react";
import styles from "./MyResponsiveLine.module.css";

const MyResponsiveLine = ({ userData, valid }) => {
  const [isValid, setIsValid] = useState(true);

  useEffect(() => {
    setIsValid(valid);
  }, [valid]);

  return (
    <div className={styles["graph-wrapper"]}>
      {!isValid && (
        <div className={styles.cover}>
          <h3>진단 결과 데이터를 찾을 수 없습니다.</h3>
        </div>
      )}
      <div className={styles.title}>
        <h1>요약 그래프</h1>
        <p>날짜별 수치값을 확인할 수 있습니다.</p>
      </div>
      <div className={styles.graph}>
        <ResponsiveLine
          data={userData}
          margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
          xScale={{ type: "point" }}
          yScale={{
            type: "linear",
            min: "auto",
            max: "auto",
            reverse: false,
          }}
          yFormat=" >-.2f"
          axisTop={null}
          axisRight={null}
          axisBottom={{
            orient: "bottom",
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "날짜",
            legendOffset: 42,
            legendPosition: "middle",
          }}
          axisLeft={{
            orient: "left",
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "수치값",
            legendOffset: -48,
            legendPosition: "middle",
          }}
          lineWidth={3}
          colors={{ scheme: "set1" }}
          pointSize={10}
          pointColor={{ theme: "background" }}
          pointBorderWidth={2}
          pointBorderColor={{ from: "serieColor" }}
          pointLabelYOffset={-12}
          useMesh={true}
          areaBaselineValue={30}
          legends={[
            {
              anchor: "bottom-right",
              direction: "column",
              justify: false,
              translateX: 120,
              translateY: 0,
              itemsSpacing: 2,
              itemDirection: "left-to-right",
              itemWidth: 105,
              itemHeight: 20,
              itemOpacity: 0.75,
              symbolSize: 14,
              symbolShape: "circle",
              symbolBorderColor: "rgba(0, 0, 0, .5)",
              effects: [
                {
                  on: "hover",
                  style: {
                    itemBackground: "rgba(0, 0, 0, .03)",
                    itemOpacity: 1,
                  },
                },
              ],
            },
          ]}
        />
      </div>
    </div>
  );
};

export default MyResponsiveLine;
