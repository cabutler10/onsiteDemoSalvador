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

const BarGraph = React.forwardRef(function Tab(props, ref) {
  const { data, variant } = props;
  const { t } = useTranslation();
  const sbus = [
    "Zeppelin Holding",
    "Construction Equipment CIS",
    "SGE Baumaschinen EU",
    "SGE Rental",
    "SGE Anlagenbau",
    "SGE Power Systems",
    "Z Lab",
    "total"
  ];
  const categories = [
    t("sbu.Zeppelin Holding"),
    t("sbu.Construction Equipment CIS"),
    t("sbu.SGE Baumaschinen EU"),
    t("sbu.SGE Rental"),
    t("sbu.SGE Anlagenbau"),
    t("sbu.SGE Power Systems"),
    t("sbu.Z Lab"),
    t("sbu.total")
  ];

  const options = {
    chart: {
      id: "apexchart-example",
      stacked: true
    },
    plotOptions: {
      bar: {
        horizontal: true,
        dataLabels: {
          position: "top"
        }
      }
    },
    fill: {
      opacity: 1
    },
    dataLabels: {
      formatter: function(value) {
        return variant === "processTime" ? value : value + "%";
      },
      offsetX: 30,
      style: {
        fontFamily: "Roboto",
        fontSize: 11,
        colors: ["#000"]
      }
    },
    grid: {
      show: true
    },
    yaxis: {
      labels: {
        style: {
          fontFamily: "Teko",
          fontSize: 16,
          color: "#000"
        }
      }
    },
    xaxis: {
      categories: categories,
      labels: {
        show: false
      },
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false
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
  sbus.forEach(sbu => {
    dataset.push(
      variant === "processTime"
        ? Math.round(data.processTime[sbu]) || 0
        : Math.round(data.implementationRate[sbu] * 1000) / 10 || 0
    );
  });

  return (
    <Chart
      options={options}
      series={[{ data: dataset }]}
      type="bar"
      width="100%"
      height={300}
    />
  );
});

export default BarGraph;
