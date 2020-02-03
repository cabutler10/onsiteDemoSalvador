import React from "react";
import Chart from "react-apexcharts";
import guidelines from "@zlab-de/zel-react/guidelines.json";
import { useTranslation } from "react-i18next";

const colors = [
  guidelines.theme.indigo.primary,
  guidelines.theme.indigo.secondary,
  guidelines.logo.zLabCyan.hex,
  "rgba(79,128,150,1)",
  "rgba(79,128,150,.6)",
  "rgba(200,211,217,1)",
  "rgba(200,211,217,.6)"
];

const PieGraph = React.forwardRef(function Tab(props, ref) {
  const { data } = props;
  const { t } = useTranslation();
  // Format series data for Pie Chart
  const dataset = [];
  Object.keys(data.country).forEach(elem => {
    dataset.push({
      name: t(`country.${elem}`),
      value: data.country[elem]
    });
  });
  dataset.sort((a, b) => b.value - a.value);

  // Reduce series data to just 6 countries and sum all the rest as Other
  const series = [];
  const labels = [];
  let sum = 0;
  dataset.forEach((elem, idx) => {
    if (idx < colors.length - 1) {
      series.push(elem.value);
      labels.push(elem.name);
    } else {
      sum += elem.value;
    }
  });
  series.push(sum);
  labels.push("Other");

  const options = {
    chart: {
      id: "apexchart-pie"
    },
    dataLabels: {
      style: { fontSize: 11, fontFamily: "Roboto" },
      dropShadow: {
        enabled: false
      }
    },
    labels: labels,
    colors: colors,
    legend: {
      position: "bottom",
      fontFamily: "Teko",
      fontSize: 16,
      markers: {
        radius: 2
      }
    }
  };

  return (
    <Chart
      options={options}
      series={series}
      type="pie"
      width="100%"
      height={300}
    />
  );
});

export default PieGraph;
