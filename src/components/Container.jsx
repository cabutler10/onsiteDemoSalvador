import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { createUseStyles } from "react-jss";
import clsx from "clsx";
import Select from "@zlab-de/zel-react/Select";
import { useTranslation } from "react-i18next";
import Tooltip from "@reach/tooltip";
import "@reach/tooltip/styles.css";
import ZepiconsWarning from "@zlab-de/zel-react-icons/ZepiconsWarning";
import ZepiconsInfo from "@zlab-de/zel-react-icons/ZepiconsInfo";

const useStyles = createUseStyles(theme => ({
  root: {
    padding: `${theme.spacing.component.m.rem}rem`,
    marginBottom: `${theme.spacing.component.m.rem}rem`,
    background: theme.color.gray.white.hex,
    boxShadow:
      "0px 1px 3px 0px rgba(0,0,0,0.05),0px 1px 1px 0px rgba(0,0,0,0.05),0px 2px 1px -1px rgba(0,0,0,0.05)"
  },
  1: {
    flexBasis: "100%"
  },
  2: {
    flexBasis: "100%"
  },
  3: {
    flexBasis: "100%"
  },
  50: {
    flexBasis: "100%"
  },
  [`@media (min-width: ${theme.breakpoint.m})`]: {
    root: {
      marginBottom: `${theme.spacing.component.xxl.rem}rem`
    },
    1: {
      flexBasis: "32%"
    },
    2: {
      flexBasis: "66%"
    },
    3: {
      flexBasis: "100%"
    },
    50: {
      flexBasis: "49%"
    }
  },
  container: {
    display: "flex",
    justifyContent: "space-between",
    height: 66
  },
  title: {
    color: theme.color.gray.grayLight.hex,
    textTransform: "capitalize"
  },
  select: {
    width: 170,
    zIndex: 2000
  },
  iconContainer: {
    float: "right"
  },
  icon: {
    marginLeft: 10,
    width: 24
  }
}));

function Container({
  children: childrenProp,
  title,
  variant,
  tooltipVariant,
  dataset,
  quarterly,
  ...props
}) {
  const { t } = useTranslation();
  const classes = useStyles(props);
  const [value, setValue] = useState(null);

  useEffect(() => {
    setValue({
      value: quarterly ? t("body.yearly") : String(new Date().getFullYear()),
      key: quarterly ? "total" : String(new Date().getFullYear())
    });
  }, [t, quarterly]);

  const searchItems = [];
  const keys = dataset ? Object.keys(dataset).sort((a, b) => b - a) : [];
  if (quarterly) {
    searchItems.push({ value: t("body.quarterly"), key: "quarterly" });
    searchItems.push({ value: t("body.yearly"), key: "total" });
  } else {
    keys.forEach(elem => {
      if (elem !== "total" && elem !== "quarterly") {
        searchItems.push({ value: elem, key: elem });
      }
    });
    searchItems.push({ value: t("body.total"), key: "total" });
  }

  let data = quarterly ? dataset : value ? dataset[value.key] : null;
  const children = React.cloneElement(childrenProp, {
    data,
    quarterly: quarterly && value ? value.key : null
  });
  return (
    <>
      {value && (
        <div className={clsx(classes.root, classes[variant ? variant : 1])}>
          <div className={classes.container}>
            <h2 className={clsx(classes.title, "zep-typo--display-5")}>
              {title}
            </h2>
            <div className={classes.select}>
              <Select
                onChange={selection => setValue(selection)}
                items={searchItems}
                label={t("body.time")}
                placeholder={value.value}
              />
            </div>
          </div>
          {children}
          {tooltipVariant && (
            <div className={classes.iconContainer}>
              {tooltipVariant === "process" && value.value === "2017" && (
                <Tooltip
                  label={t("processTime.warning")}
                  style={{
                    background: "hsla(0, 0%, 0%, 0.75)",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    padding: "0.5em 1em",
                    fontFamily: "Roboto"
                  }}
                >
                  <ZepiconsWarning className={classes.icon} />
                </Tooltip>
              )}
              <Tooltip
                label={
                  tooltipVariant === "process"
                    ? t("processTime.tooltip")
                    : t("implementationRate.tooltip")
                }
                style={{
                  background: "hsla(0, 0%, 0%, 0.75)",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  padding: "0.5em 1em",
                  fontFamily: "Roboto"
                }}
              >
                <ZepiconsInfo className={classes.icon} />
              </Tooltip>
            </div>
          )}
        </div>
      )}
    </>
  );
}

Container.propTypes = {
  variant: PropTypes.oneOf(["1", "2", "3", "50"])
};

export default Container;
