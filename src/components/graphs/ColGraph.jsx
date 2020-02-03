import React from "react";
import Chart from "react-apexcharts";
import guidelines from "@zlab-de/zel-react/guidelines.json";
import { useTranslation } from "react-i18next";

const colors = [
  guidelines.theme.indigo.primary,
  guidelines.theme.yellow.primary,
  guidelines.theme.yellow.primary,
  guidelines.theme.red.primary,
  guidelines.color.corporate.gray.hex,
  guidelines.color.corporate.steel.hex,
  guidelines.logo.zLabCyan.hex
];

const ColGraph = React.forwardRef(function Tab(props, ref) {
  const { data, quarterly } = props;
  const { t } = useTranslation();

  const years = Object.keys(data).filter(e => e.indexOf("2") !== -1);
  const quarters = Object.keys(data["quarterly"]);
  const sbus = [
    "Zeppelin Holding",
    "Construction Equipment CIS",
    "SGE Baumaschinen EU",
    "SGE Rental",
    "SGE Anlagenbau",
    "SGE Power Systems",
    "Z Lab"
  ];

  const options = {
    chart: {
      id: "apexchart-example",
      stacked: true
    },
    plotOptions: {
      bar: {
        horizontal: false,
        dataLabels: {
          position: "center"
        }
      }
    },
    fill: {
      opacity: 1
    },
    dataLabels: {
      offsetX: 0,
      style: { fontSize: 11, fontFamily: "Roboto" }
    },
    grid: {
      show: true
    },
    yaxis: {
      labels: {
        style: {
          fontFamily: "Teko",
          fontSize: 20,
          color: "#000"
        }
      }
    },
    xaxis: {
      categories: quarterly === "total" ? years : quarters,
      labels: {
        style: {
          fontFamily: "Teko",
          fontSize: 16,
          color: "#000"
        }
      }
    },
    colors: colors,
    legend: {
      position: "right",
      offsetY: 40,
      fontFamily: "Teko",
      fontSize: 16
    }
  };

  const dataset = [];
  if (quarterly === "total") {
    sbus.forEach(sbu => {
      let datum = [];
      years.forEach(year => datum.push(data[year].company[sbu]));
      dataset.push({ name: t(`sbu.${sbu}`), data: datum });
    });
  } else {
    sbus.forEach(sbu => {
      let datum = [];
      Object.keys(data["quarterly"]).forEach(quarter =>
        datum.push(data["quarterly"][quarter][sbu])
      );
      dataset.push({ name: t(`sbu.${sbu}`), data: datum });
    });
  }

  return (
    <Chart
      options={options}
      series={dataset}
      type="bar"
      width="100%"
      height={300}
    />
  );
});

export default ColGraph;
