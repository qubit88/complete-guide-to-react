import React, { useState } from "react";
import { connect } from "react-redux";
import Button from "../../../components/UI/Button/Button";
import axios from "../../../axios-orders";
import withError from "../../../hoc/withError/withError";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";
import s from "./ContactData.module.css";
import * as actions from "../../../store/actions";
import { checkValidity } from "../../../shared/utility";

const ContactData = props => {
  const [orderForm, setOrderForm] = useState({
    name: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Your Name"
      },
      value: "",
      validation: {
        required: true
      },
      valid: false,
      touched: false
    },
    street: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Your street"
      },
      value: "",
      validation: {
        required: true
      },
      valid: false,
      touched: false
    },
    zipCode: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Your zipCode"
      },
      value: "",
      validation: {
        required: true,
        minLength: 5,
        maxLength: 5
      },
      valid: false,
      touched: false
    },
    country: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Your Country"
      },
      value: "",
      validation: {
        required: true
      },
      valid: false,
      touched: false
    },
    email: {
      elementType: "input",
      elementConfig: {
        type: "email",
        placeholder: "Your email"
      },
      value: "",
      validation: {
        required: true
      },
      valid: false,
      touched: false
    },
    delivery: {
      elementType: "select",
      elementConfig: {
        options: [
          { value: "fastest", displayValue: "Fastest" },
          { value: "cheapest", displayValue: "Cheapest" }
        ]
      },
      value: "cheapest",
      validation: {},
      valid: true
    }
  });
  const [formIsValid, setFormIsValid] = useState(false);

  const orderHandler = e => {
    e.preventDefault();
    const formData = {};

    for (let name in orderForm) {
      formData[name] = orderForm[name];
    }
    const order = {
      ingredients: props.ingredients,
      price: props.price,
      orderData: formData,
      userId: props.userId
    };

    props.onOrderBurger(order, props.token);
  };

  const inputChangedHandler = (event, inputIdentifier) => {
    console.log(event.target.value);
    const updatedOrderForm = {
      ...orderForm
    };
    const updatedFormElement = {
      ...updatedOrderForm[inputIdentifier]
    };
    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = checkValidity(
      updatedFormElement.value,
      updatedFormElement.validation
    );
    updatedFormElement.touched = true;

    let formIsValid = true;
    for (let inputIdentifier in updatedOrderForm) {
      formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
    }
    console.log(formIsValid);
    updatedOrderForm[inputIdentifier] = updatedFormElement;
    setOrderForm(updatedOrderForm);
    setFormIsValid(formIsValid);
  };

  const formElementsArray = [];

  for (let key in orderForm) {
    formElementsArray.push({ id: key, config: orderForm[key] });
  }

  let form = (
    <form onSubmit={orderHandler}>
      {formElementsArray.map(formElement => (
        <Input
          changed={event => inputChangedHandler(event, formElement.id)}
          key={formElement.id}
          elementType={formElement.config.elementType}
          elementConfig={formElement.config.elementConfig}
          invalid={!formElement.config.valid}
          shouldValidate={formElement.config.validation}
          touched={formElement.config.touched}
          value={formElement.config.value}
        />
      ))}
      <Button clicked={orderHandler} disabled={!formIsValid} btnType="Success">
        ORDER
      </Button>
    </form>
  );

  if (props.loading) {
    form = <Spinner />;
  }
  return (
    <div className={s.ContactData}>
      <h4>Enter you Contact Data</h4>
      {form}
    </div>
  );
};

const mapStateToProps = state => ({
  ingredients: state.burgerBuilder.ingredients,
  price: state.burgerBuilder.totalPrice,
  loading: state.order.loading,
  token: state.auth.token,
  userId: state.auth.userId
});

const mapDispatchToProps = dispatch => ({
  onOrderBurger: (orderData, token) =>
    dispatch(actions.purchaseBurger(orderData, token))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withError(ContactData, axios));
