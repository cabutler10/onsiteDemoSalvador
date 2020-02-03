import React from "react";
import Chart from "react-apexcharts";
import guidelines from "@zlab-de/zel-react/guidelines.json";
import { useTranslation } from "react-i18next";

const colors = [guidelines.theme.indigo.primary, "#0066FF", "#00AEEF"];

const LineGraph = React.forwardRef(function Tab(props, ref) {
  const { data, variant } = props;
  const { t } = useTranslation();

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
      categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998],
      labels: {
        show: true
      },
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false
      }
    },
    colors: colors
    // legend: {
    //   position: "right",
    //   offsetY: 40,
    //   fontFamily: "Teko",
    //   fontSize: 16
    // }
  };

  const dataset = [
    {
      name: "series-1",
      data: [30, 40, 45, 50, 49, 60, 70, 91]
    },
    {
      name: "series-2",
      data: [25, 4, 4, 5, 4, 6, 7, 1]
    },
    {
      name: "series-3",
      data: [20, 40, 45, 50, 49, 60, 70, 91]
    }
  ];

  return (
    <Chart
      options={options}
      series={dataset}
      type="line"
      width="100%"
      height={300}
    />
  );
});

export default LineGraph;
