import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import Spinner from "../../components/UI/Spinner/Spinner";
import * as actions from "../../store/actions";
import { connect } from "react-redux";
import classes from "./Auth.module.css";
import { checkValidity } from "../../shared/utility";

const Auth = props => {
  const [controls, setControls] = useState({
    email: {
      elementType: "input",
      elementConfig: {
        type: "email",
        placeholder: "Your Email"
      },
      value: "",
      validation: {
        required: true,
        isEmail: true
      },
      valid: false,
      touched: false
    },
    password: {
      elementType: "input",
      elementConfig: {
        type: "password",
        placeholder: "Password"
      },
      value: "",
      validation: {
        required: true,
        minLength: 6
      },
      valid: false,
      touched: false
    }
  });

  const [isSignup, setIsSignup] = useState(true);

  useEffect(() => {
    if (!props.buildingBurger && props.authRedirectPath != "/") {
      props.onSetAuthRedirectPath();
    }
  }, []);

  const inputChangedHandler = (event, controlName) => {
    console.log(event.target.value);
    const updatedControls = {
      ...controls,
      [controlName]: {
        ...controls[controlName],
        value: event.target.value,
        valid: checkValidity(
          event.target.value,
          controls[controlName].validation
        ),
        touched: true
      }
    };

    setControls(updatedControls);
  };

  const submitHandler = e => {
    e.preventDefault();
    props.onAuth(controls.email.value, controls.password.value, isSignup);
  };

  const switchAuthModeHandler = e => {
    e.preventDefault();
    setIsSignup(!isSignup);
  };

  const formElementsArray = [];

  for (let key in controls) {
    formElementsArray.push({ id: key, config: controls[key] });
  }

  let form = formElementsArray.map(formElement => (
    <Input
      key={formElementsArray.id}
      changed={event => inputChangedHandler(event, formElement.id)}
      elementType={formElement.config.elementType}
      elementConfig={formElement.config.elementConfig}
      invalid={!formElement.config.valid}
      shouldValidate={formElement.config.validation}
      touched={formElement.config.touched}
      value={formElement.config.value}
    />
  ));

  if (props.loading) {
    form = <Spinner />;
  }

  let errorMessage = null;

  if (props.error) {
    errorMessage = <p>{props.error.message}</p>;
  }

  let authRedirect = null;

  if (props.isAuth) {
    authRedirect = <Redirect to={props.authRedirectPath} />;
  }
  return (
    <div className={classes.Auth}>
      <form onSubmit={submitHandler}>
        {errorMessage}
        {form}
        {authRedirect}
        <Button btnType="Success">SUBMIT</Button>
        <Button btnType="Danger" clicked={switchAuthModeHandler}>
          SWITCH TO {isSignup ? "SIGNIN" : "SIGNUP"}
        </Button>
      </form>
    </div>
  );
};

const mapStateToProps = state => ({
  loading: state.auth.loading,
  error: state.auth.error,
  isAuth: !!state.auth.token,
  buildingBurger: state.burgerBuilder,
  authRedirectPath: state.auth.authRedirectPath
});

const mapDispatchToProps = dispatch => ({
  onAuth: (email, password, isSignup) =>
    dispatch(actions.auth(email, password, isSignup)),
  onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath("/"))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Auth);
