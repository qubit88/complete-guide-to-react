import React from "react";
import classes from "./Logo.module.css";

import burgerLogo from "../../assets/images/burger-logo.png";

const Logo = props => (
  <div style={{ height: props.height }} className={classes.Logo}>
    <img src={burgerLogo} alt="BurgerBrand" />
  </div>
);

export default Logo;
