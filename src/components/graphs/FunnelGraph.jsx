import React from "react";
import Chart from "react-apexcharts";
import guidelines from "@zlab-de/zel-react/guidelines.json";
import { useTranslation } from "react-i18next";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles(theme => ({
  root: {
    textTransform: "capitalize",
    color: theme.color.gray.black.hex
  }
}));

const colors = [guidelines.theme.indigo.primary, "#c8d3d9"];

const FunnelGraph = React.forwardRef(function Tab(props, ref) {
  const { data } = props;
  const { t } = useTranslation();
  const classes = useStyles(props);

  const options = {
    chart: {
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
    legend: {
      show: false
    },
    colors: colors,
    grid: {
      borderColor: "transparent"
    },
    tooltip: {
      enabled: true
    },
    dataLabels: {
      enabled: true,
      offsetX: 30,
      style: {
        fontFamily: "Roboto",
        fontSize: 11,
        colors: ["#000"]
      }
    },
    yaxis: {
      labels: {
        style: {
          fontFamily: "Teko",
          fontSize: 20,
          cssClass: classes.root
        }
      }
    },
    xaxis: {
      labels: {
        show: false
      },
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false
      },
      categories: [
        t("status.submitted"),
        t("status.notAssessed"),
        t("status.rejected"),
        t("status.inAssessment"),
        t("status.inProgress"),
        t("status.implemented")
      ]
    }
  };

  const dataset = [
    {
      name: "Ideas",
      data: [
        data.status.submitted,
        data.status.notAssessed,
        0,
        data.status.inAssessment,
        data.status.inImplementation,
        data.status.implemented
      ]
    },
    {
      name: "Rejected",
      data: [0, 0, data.status.reject, 0, 0, 0]
    }
  ];
  return (
    <div>
      <Chart
        options={options}
        series={dataset}
        type="bar"
        width="100%"
        height={250}
      />
    </div>
  );
});

export default FunnelGraph;
