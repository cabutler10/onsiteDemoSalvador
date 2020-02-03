import React, { useState, useEffect } from "react";
import { createUseStyles } from "react-jss";
import { useTranslation } from "react-i18next";
import clsx from "clsx";
import GridContainer from "@zlab-de/zel-react/GridContainer";
// import Container from "./Container";
// import ColGraph from "./graphs/ColGraph";
// import BarGraph from "./graphs/BarGraph";
// import PieGraph from "./graphs/PieGraph";
// import FunnelGraph from "./graphs/FunnelGraph";
import LineGraph from "./graphs/LineGraph";

const useStyles = createUseStyles(theme => ({
  root: {
    flexBasis: "100%",
    padding: `${theme.spacing.component.m.rem}rem`
  },
  [`@media (min-width: ${theme.breakpoint.m})`]: {
    root: {
      flexBasis: "80%",
      padding: `${theme.spacing.component.xxl.rem}rem`
    }
  },
  heading: {
    marginBottom: `${theme.spacing.component.l.rem}rem`,
    textTransform: "capitalize"
  },
  container: {
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap"
  }
}));

function getQuarter(date) {
  let value = null;
  switch (date) {
    case 0:
    case 1:
    case 2:
      value = 1;
      break;
    case 3:
    case 4:
    case 5:
      value = 2;
      break;
    case 6:
    case 7:
    case 8:
      value = 3;
      break;
    case 9:
    case 10:
    case 11:
      value = 4;
      break;
    default:
      value = null;
  }
  return value;
}

function Content({ ...props }) {
  const classes = useStyles(props);
  const { t } = useTranslation();
  const [dataset, setDataset] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = () => {
      // var prefix = window.location.href.split('/')[0];
      // var url = `${prefix}/zidea/api/data`;
      var url = "http://0.0.0.0:5000/zidea/api/data";

      setLoading(true);
      fetch(url, {
        mode: "cors"
      })
        .then(r => r.json().then(data => ({ status: r.status, body: data })))
        .then(obj => {
          if (obj.status === 200) {
            setLoading(false);
            setDataset(obj.body);
          } else {
            setError("Unable to connect to database.");
            setLoading(false);
          }
        })
        .catch(err => {
          setLoading(false);
          setError(
            "Unable to connect to database. Please contact Team Data Analytics."
          );
          console.log("api error: " + err);
        });
    };
    fetchData();
  }, []);

  return (
    <GridContainer className={classes.root}>
      <h1 className={"zep-typo--display-5"}>Onsite Demo</h1>
      <h2 className={clsx(classes.heading, "zep-typo--normal-body1")}>
        04.02.2020
      </h2>
      {/* {isLoading && <div className="spinner" />}
      {error && (
        <div className="zep-notification zep-notification--danger">{error}</div>
      )}
      {!isLoading && !error && dataset && ( */}
      <>
        <div>
          <LineGraph dataset={dataset} />
        </div>
      </>
      {/* )} */}
    </GridContainer>
  );
}

export default Content;
