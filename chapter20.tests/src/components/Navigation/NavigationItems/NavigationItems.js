import React from "react";
import NavigationItem from "./NavigationItem/NavigationItem";

import classes from "./NavigationItems.module.css";

const NavigationItems = ({ isAuth }) => (
  <ul className={classes.NavigationItems}>
    <NavigationItem exact link="/">
      Burger Builder
    </NavigationItem>
    {isAuth ? <NavigationItem link="/checkout">Checkout</NavigationItem> : null}
    {isAuth ? <NavigationItem link="/orders">Orders</NavigationItem> : null}
    {!isAuth ? (
      <NavigationItem link="/auth">Authentication</NavigationItem>
    ) : (
      <NavigationItem link="/logout">Logout</NavigationItem>
    )}
  </ul>
);

export default NavigationItems;
