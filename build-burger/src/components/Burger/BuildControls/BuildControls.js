import React from "react";
import BuildControl from "./BuildControl/BuildControl";
import classes from "./BuildControls.module.css";

const controls = [
  { label: "Salad", type: "salad" },
  { label: "Bacon", type: "bacon" },
  { label: "Meat", type: "meat" },
  { label: "Cheese", type: "cheese" }
];

const BuildControls = props => (
  <div className={classes.BuildControls}>
    <p>
      Current price: <strong> {props.price.toFixed(2)} </strong>
    </p>
    {controls.map(ctrl => (
      <BuildControl
        added={() => props.ingredientAdded(ctrl.type)}
        removed={() => props.ingredientRemoved(ctrl.type)}
        disabled={props.disabled[ctrl.type]}
        key={ctrl.label}
        label={ctrl.label}
      />
    ))}
    <button disabled={!props.puchasable} className={classes.OrderButton}>
      order now
    </button>
  </div>
);

export default BuildControls;
