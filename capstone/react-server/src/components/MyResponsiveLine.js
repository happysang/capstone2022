import { ResponsiveLine } from "@nivo/line";
import styles from "./MyResponsiveLine.module.css";

const MyResponsiveLine = () => {
  const data = [
    {
      id: "모낭사이홍반",
      color: "hsl(301, 70%, 50%)",
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
      color: "hsl(180, 70%, 50%)",
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
  ];

  return (
    <div className={styles["graph-wrapper"]}>
      <div className={styles.title}>
        <h1>요약 그래프</h1>
        <p>날짜별 수치값을 확인할 수 있습니다.</p>
      </div>
      <div className={styles.graph}>
        <ResponsiveLine
          data={data}
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
          // enableArea={true}
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
