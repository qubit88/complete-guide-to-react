import React from "react";
import s from "./Input.module.css";

function Input(props) {
  let inputElement = null;

  switch (props.elementType) {
    case "input":
      inputElement = (
        <input
          onChange={props.changed}
          className={s.InputElement}
          {...props.elementConfig}
          value={props.value}
        />
      );
      break;
    case "textarea":
      inputElement = (
        <textarea
          onChange={props.changed}
          className={s.InputElement}
          {...props.elementConfig}
          value={props.value}
        />
      );
      break;
    case "select":
      inputElement = (
        <select
          onChange={props.changed}
          className={s.InputElement}
          value={props.value}
        >
          {props.elementConfig.options.map(option => (
            <option key={option.value} value={option.value}>
              {option.displayValue}
            </option>
          ))}
        </select>
      );
      break;
    default:
      inputElement = (
        <input
          onChange={props.changed}
          className={s.InputElement}
          {...props.elementConfig}
          value={props.value}
        />
      );
  }
  return (
    <div className={s.Input}>
      <label className={s.Label}>{props.label}</label>
      {inputElement}
    </div>
  );
}

export default Input;
