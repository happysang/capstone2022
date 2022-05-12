import { ResponsiveRadar } from "@nivo/radar";
import styles from "./MyResponsiveRadar.module.css";

const MyResponsiveRadar = () => {
  const result = [
    {
      result: "dry",
      typeOfScalp: [
        {
          type: "모낭사이홍반",
          value: 0.5283360481262207,
          state: "경증",
        },
        {
          type: "모낭홍반농포",
          value: 0.2934652864933014,
          state: "경증",
        },
        {
          type: "미세각질",
          value: 0.43676191568374634,
          state: "중증",
        },
        {
          type: "비듬",
          value: 0.31993556022644043,
          state: "경증",
        },
        {
          type: "탈모",
          value: 0.4134784936904907,
          state: "경증",
        },
      ],
      User_ID: "DummyTestID_qorgh346",
    },
  ];

  const resultData = result[0].typeOfScalp.map((item) => {
    return {
      type: item.type,
      user: item.value,
      normal: 1,
    };
  });

  console.log(resultData);

  const d = [
    {
      type: "모낭사이홍반",
      user: 0.5283360481262207,
      normal: 1,
    },
    {
      type: "모낭홍반농포",
      user: 0.2934652864933014,
      normal: 1,
    },
    {
      type: "미세각질",
      user: 0.43676191568374634,
      normal: 1,
    },
    {
      type: "비듬",
      user: 0.31993556022644043,
      normal: 1,
    },
    {
      type: "탈모",
      user: 0.4134784936904907,
      normal: 1,
    },
  ];

  const data = [
    {
      taste: "fruity",
      chardonay: 55,
      carmenere: 120,
      syrah: 66,
    },
    {
      taste: "bitter",
      chardonay: 26,
      carmenere: 57,
      syrah: 75,
    },
    {
      taste: "heavy",
      chardonay: 57,
      carmenere: 63,
      syrah: 52,
    },
    {
      taste: "strong",
      chardonay: 105,
      carmenere: 37,
      syrah: 51,
    },
    {
      taste: "sunny",
      chardonay: 118,
      carmenere: 71,
      syrah: 68,
    },
  ];

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
