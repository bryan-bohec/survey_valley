import * as React from "react";
import { useState, useEffect } from "react";
import ReactEcharts from "echarts-for-react";

export default function Piechart(props) {
  useEffect(() => {
    console.log(props);
  });
  const option = {
    tooltip: {
      trigger: "item",
      confine: true,
    },
    legend: {
      left: "10",
      orient: "vertical",
      selected: {
        "aliments infantiles": false,
        "series 1": false,
        "matières grasses": false,
      },
      textStyle: {
        color: "white", // Changer la couleur ici
      },
    },

    series: [
      {
        name: "Les groupes les plus choisis",
        type: "pie",
        radius: ["40%", "70%"],
        avoidLabelOverlap: true,
        itemStyle: {
          borderRadius: 10,
          borderColor: "#fff",
          borderWidth: 2,
        },
        label: {
          show: false,
          position: "center",
        },
        emphasis: {
          label: {
            show: false,
            fontSize: 40,
            fontWeight: "bold",
          },
        },
        labelLine: {
          show: false,
        },
        data: props.data.map((item) => ({ name: item.alim_grp_nom_fr, value: item.count, selected: false })),
      },
    ],
  };

  return (
    <div>
      <h2 className="mb-6">Les groupes les plus selectionnés</h2>
      <ReactEcharts option={option} />
    </div>
  );
}
