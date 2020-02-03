import React, { useState } from "react";
import { createUseStyles } from "react-jss";
import clsx from "clsx";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Content from "./components/Content";
import { useTranslation } from "react-i18next";

const useStyles = createUseStyles(theme => ({
  root: {
    display: "flex",
    flexDirection: "column",
    background: theme.color.gray.grayLightest.hex,
    minHeight: "100%"
  },
  body: {
    flex: 1
  },
  container: {
    display: "flex",
    justifyContent: "center"
  }
}));

function App({ ...props }) {
  const classes = useStyles(props);
  const { i18n } = useTranslation();
  const [lang, setLang] = useState("en");

  const handleSetLang = () => {
    let language = lang === "en" ? "de" : "en";
    i18n.changeLanguage(language);
    setLang(language);
  };

  return (
    <div className={clsx("theme-zeppelin", classes.root)}>
      <Header lang={lang} handleSetLang={handleSetLang} />
      <div className={classes.body}>
        <div className={classes.container}>
          <Content />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
