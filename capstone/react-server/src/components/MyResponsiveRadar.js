import { ResponsiveRadar } from "@nivo/radar";
import React, { useState } from "react";
import styles from "./MyResponsiveRadar.module.css";

const MyResponsiveRadar = () => {
  const [errorMessage, setErrorMeesage] = useState("");

  const resultObj = JSON.parse(localStorage.getItem("RESULT"));
  if (!resultObj) setErrorMeesage("에러 발생");

  if (errorMessage) console.log(errorMessage);

  const resultData = resultObj.typeOfScalp.map((item) => {
    console.log(item);
    return {
      type: item.type,
      user: item.value,
      normal: 1,
    };
  });

  return (
    <div style={{ width: "600px", height: "600px" }}>
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
  );
};

export default MyResponsiveRadar;
