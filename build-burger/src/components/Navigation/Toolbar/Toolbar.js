import React from "react";
import Logo from "../../Logo/Logo";
import classes from "./Toolbar.module.css";
import NavigationItems from "../NavigationItems/NavigationItems";

const Toolbar = props => (
  <header className={classes.Toolbar}>
    <div>MENU</div>
    <Logo height="80%" />
    <NavigationItems />
  </header>
);

export default Toolbar;
