import { ResponsiveTimeRange } from "@nivo/calendar";

const MyResponsiveTimeRange = () => {
  const data = [
    {
      value: 54,
      day: "2018-06-28",
    },
    {
      value: 48,
      day: "2018-06-25",
    },
    {
      value: 26,
      day: "2018-06-24",
    },
    {
      value: 282,
      day: "2018-05-23",
    },
    {
      value: 149,
      day: "2018-05-06",
    },
    {
      value: 245,
      day: "2018-08-02",
    },
    {
      value: 286,
      day: "2018-05-16",
    },
    {
      value: 304,
      day: "2018-04-22",
    },
    {
      value: 347,
      day: "2018-07-08",
    },
    {
      value: 399,
      day: "2018-05-21",
    },
    {
      value: 196,
      day: "2018-06-17",
    },
    {
      value: 373,
      day: "2018-05-12",
    },
    {
      value: 203,
      day: "2018-06-07",
    },
    {
      value: 356,
      day: "2018-08-11",
    },
    {
      value: 312,
      day: "2018-07-15",
    },
    {
      value: 331,
      day: "2018-06-27",
    },
    {
      value: 153,
      day: "2018-07-10",
    },
    {
      value: 367,
      day: "2018-04-08",
    },
    {
      value: 207,
      day: "2018-07-17",
    },
    {
      value: 116,
      day: "2018-07-16",
    },
    {
      value: 68,
      day: "2018-06-16",
    },
    {
      value: 238,
      day: "2018-08-09",
    },
    {
      value: 320,
      day: "2018-06-19",
    },
    {
      value: 229,
      day: "2018-07-04",
    },
    {
      value: 343,
      day: "2018-08-06",
    },
    {
      value: 170,
      day: "2018-08-01",
    },
    {
      value: 316,
      day: "2018-04-17",
    },
    {
      value: 223,
      day: "2018-05-03",
    },
    {
      value: 28,
      day: "2018-07-19",
    },
    {
      value: 290,
      day: "2018-08-10",
    },
    {
      value: 321,
      day: "2018-05-08",
    },
    {
      value: 95,
      day: "2018-06-11",
    },
    {
      value: 222,
      day: "2018-08-03",
    },
    {
      value: 360,
      day: "2018-07-11",
    },
    {
      value: 283,
      day: "2018-06-14",
    },
    {
      value: 85,
      day: "2018-04-29",
    },
    {
      value: 270,
      day: "2018-05-05",
    },
    {
      value: 389,
      day: "2018-05-01",
    },
    {
      value: 308,
      day: "2018-06-09",
    },
    {
      value: 15,
      day: "2018-06-04",
    },
    {
      value: 392,
      day: "2018-04-10",
    },
    {
      value: 139,
      day: "2018-05-04",
    },
    {
      value: 389,
      day: "2018-04-23",
    },
    {
      value: 92,
      day: "2018-04-03",
    },
    {
      value: 222,
      day: "2018-04-18",
    },
    {
      value: 214,
      day: "2018-04-14",
    },
    {
      value: 139,
      day: "2018-06-26",
    },
    {
      value: 84,
      day: "2018-05-02",
    },
    {
      value: 362,
      day: "2018-06-05",
    },
    {
      value: 311,
      day: "2018-08-04",
    },
    {
      value: 166,
      day: "2018-07-18",
    },
    {
      value: 98,
      day: "2018-06-18",
    },
    {
      value: 11,
      day: "2018-05-31",
    },
    {
      value: 64,
      day: "2018-04-21",
    },
    {
      value: 200,
      day: "2018-04-27",
    },
    {
      value: 172,
      day: "2018-04-06",
    },
    {
      value: 347,
      day: "2018-04-20",
    },
    {
      value: 201,
      day: "2018-04-25",
    },
    {
      value: 380,
      day: "2018-07-06",
    },
    {
      value: 170,
      day: "2018-06-01",
    },
    {
      value: 375,
      day: "2018-04-09",
    },
    {
      value: 1,
      day: "2018-07-22",
    },
    {
      value: 31,
      day: "2018-06-23",
    },
    {
      value: 198,
      day: "2018-07-05",
    },
    {
      value: 211,
      day: "2018-06-02",
    },
    {
      value: 150,
      day: "2018-05-24",
    },
    {
      value: 349,
      day: "2018-04-07",
    },
    {
      value: 2,
      day: "2018-07-20",
    },
    {
      value: 53,
      day: "2018-05-15",
    },
    {
      value: 15,
      day: "2018-05-19",
    },
    {
      value: 311,
      day: "2018-05-25",
    },
    {
      value: 130,
      day: "2018-07-21",
    },
    {
      value: 203,
      day: "2018-07-24",
    },
    {
      value: 295,
      day: "2018-05-07",
    },
    {
      value: 61,
      day: "2018-05-20",
    },
    {
      value: 270,
      day: "2018-05-22",
    },
    {
      value: 217,
      day: "2018-07-28",
    },
    {
      value: 206,
      day: "2018-04-26",
    },
    {
      value: 282,
      day: "2018-07-30",
    },
    {
      value: 121,
      day: "2018-04-01",
    },
    {
      value: 342,
      day: "2018-06-10",
    },
    {
      value: 136,
      day: "2018-04-15",
    },
    {
      value: 107,
      day: "2018-05-27",
    },
    {
      value: 244,
      day: "2018-07-25",
    },
    {
      value: 31,
      day: "2018-05-18",
    },
    {
      value: 142,
      day: "2018-04-11",
    },
    {
      value: 103,
      day: "2018-06-21",
    },
    {
      value: 229,
      day: "2018-07-07",
    },
    {
      value: 111,
      day: "2018-06-22",
    },
    {
      value: 269,
      day: "2018-04-02",
    },
    {
      value: 162,
      day: "2018-08-07",
    },
    {
      value: 24,
      day: "2018-07-03",
    },
    {
      value: 352,
      day: "2018-05-14",
    },
    {
      value: 172,
      day: "2018-05-09",
    },
    {
      value: 3,
      day: "2018-07-14",
    },
    {
      value: 150,
      day: "2018-06-30",
    },
    {
      value: 267,
      day: "2018-06-06",
    },
    {
      value: 323,
      day: "2018-04-12",
    },
    {
      value: 319,
      day: "2018-07-27",
    },
    {
      value: 196,
      day: "2018-04-28",
    },
    {
      value: 352,
      day: "2018-07-01",
    },
    {
      value: 80,
      day: "2018-04-04",
    },
    {
      value: 280,
      day: "2018-05-13",
    },
    {
      value: 237,
      day: "2018-05-30",
    },
    {
      value: 369,
      day: "2018-06-03",
    },
  ];

  return (
    <div style={{ width: "600px", height: "400px" }}>
      <ResponsiveTimeRange
        data={data}
        from="2018-04-01"
        to="2018-08-12"
        emptyColor="#eeeeee"
        colors={["#61cdbb", "#97e3d5", "#e8c1a0", "#f47560"]}
        margin={{ top: 40, right: 40, bottom: 100, left: 40 }}
        dayBorderWidth={2}
        dayBorderColor="#ffffff"
        legends={[
          {
            anchor: "bottom-right",
            direction: "row",
            justify: false,
            itemCount: 4,
            itemWidth: 42,
            itemHeight: 36,
            itemsSpacing: 14,
            itemDirection: "right-to-left",
            translateX: -60,
            translateY: -60,
            symbolSize: 20,
          },
        ]}
      />
    </div>
  );
};

export default MyResponsiveTimeRange;
