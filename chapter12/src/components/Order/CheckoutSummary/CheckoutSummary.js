import React from "react";
import Burger from "../../Burger/Burger";
import Button from "../../UI/Button/Button";
import s from "./CheckoutSummary.module.css";

const CheckoutSummary = props => {
  return (
    <div className={s.CheckoutSummary}>
      <h1>We hope it tastes well!</h1>
      <div style={{ width: "100%", margin: "auto" }}>
        <Burger ingredients={props.ingredients} />
      </div>
      <Button clicked btnType="Danger">
        CANCEL
      </Button>
      <Button clicked btnType="Success">
        SUCCESS
      </Button>
    </div>
  );
};

export default CheckoutSummary;
