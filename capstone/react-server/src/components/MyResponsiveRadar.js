import { ResponsiveRadar } from "@nivo/radar";
import React from "react";
import styles from "./MyResponsiveRadar.module.css";

const MyResponsiveRadar = ({ data }) => {
  const resultData = data.typeOfScalp.map((item) => {
    return {
      type: item.type,
      user: item.value,
      normal: 1,
    };
  });

  return (
    <div className={styles["graph-wrapper"]}>
      <div className={styles.title}>
        <h1>수치 그래프</h1>
        <p>유형별 수치값을 확인할 수 있습니다.</p>
      </div>
      <div className={styles.graph}>
        <ResponsiveRadar
          data={resultData}
          keys={["normal", "user"]}
          indexBy="type"
          valueFormat=">-.2f"
          margin={{ top: 70, right: 80, bottom: 40, left: 80 }}
          borderColor={{ from: "color" }}
          gridLabelOffset={20}
          dotSize={10}
          dotColor={{ theme: "background" }}
          dotBorderWidth={2}
          colors={{ scheme: "paired" }}
          blendMode="multiply"
          motionConfig="wobbly"
          legends={[
            {
              anchor: "top-left",
              direction: "column",
              translateX: -50,
              translateY: -40,
              itemWidth: 80,
              itemHeight: 20,
              itemTextColor: "#999",
              symbolSize: 12,
              symbolShape: "circle",
              effects: [
                {
                  on: "hover",
                  style: {
                    itemTextColor: "#000",
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

export default React.memo(MyResponsiveRadar);
