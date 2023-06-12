import * as React from "react";
import { useState, useEffect } from "react";
import ReactEcharts from "echarts-for-react";

export default function Barchart(props) {
  
  const option = {
    yAxis: {
      type: "category",
      data: props.data.map((obj) => obj[Object.keys(obj)[0]].substring(0, 15)),
    },
    xAxis: {
      type: "value",
    },
    series: [
      {
        data: props.data.map((obj) => obj[Object.keys(obj)[1]]),
        type: "bar",
      },
    ],
    grid: {
      containLabel: true,
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
      formatter: function (params) {
        const category = props.data.find((obj) => obj[Object.keys(obj)[0]].startsWith(params[0].name))[Object.keys(props.data[0])[0]];
        return category + ": " + params[0].value;
      },
    },
  };
  return (
    <div>
      <h2>Les aliments les plus selectionnés</h2>
      <ReactEcharts option={option} />
    </div>
  );
}
