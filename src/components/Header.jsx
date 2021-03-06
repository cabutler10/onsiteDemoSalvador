import React from "react";
import { createUseStyles } from "react-jss";
import clsx from "clsx";
import ZeppelinIcon from "./icons/ZeppelinIcon";

const useStyles = createUseStyles(theme => ({
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    background: theme.color.gray.grayLighter.hex,
    padding: `${theme.spacing.component.l.rem}rem`
  },
  button: {
    textTransform: "uppercase"
  },
  logo: {
    color: theme.theme.indigo.primary,
    width: 100
  },
  [`@media (min-width: ${theme.breakpoint.xs})`]: {
    logo: {
      color: theme.theme.indigo.primary,
      width: 150
    }
  }
}));

function Header({ handleSetLang, lang, ...props }) {
  const classes = useStyles(props);
  return (
    <header className={classes.header}>
      <ZeppelinIcon className={classes.logo} />
      <button
        onClick={handleSetLang}
        className={clsx(classes.button, "zep-typo--display-5", "zep-button")}
      >
        {lang}
      </button>
    </header>
  );
}

export default Header;
