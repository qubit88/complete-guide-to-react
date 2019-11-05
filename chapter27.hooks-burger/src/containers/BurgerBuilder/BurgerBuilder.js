import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import withError from "../../hoc/withError/withError";
import axios from "../../axios-orders";

const BurgerBuilder = props => {
  const [purchasing, setPurchasing] = useState(false);

  useEffect(() => {
    props.onInitIngredients();
  }, []);

  const purchaseHandler = () => {
    if (props.isAuth) {
      setPurchasing(true);
    } else {
      props.onSetRedirectPath("/checkout");
      props.history.push("/auth");
    }
  };

  const updatedPurchaseState = ingredients => {
    const sum = Object.values(ingredients).reduce((acc, el) => acc + el);

    return sum > 0;
  };

  const purchaseCancelHandler = () => {
    setPurchasing(false);
  };

  const purchaseContinueHandler = () => {
    props.onInitPurchase();
    props.history.push({
      pathname: "/checkout"
    });
  };

  const disabledInfo = {
    ...props.ingredients
  };

  for (let key in disabledInfo) {
    disabledInfo[key] = disabledInfo[key] <= 0;
  }

  let orderSummary = null;

  let burger = props.error ? <p>Ingredients can't be loaded</p> : <Spinner />;

  if (props.ingredients) {
    burger = (
      <>
        <Burger ingredients={props.ingredients} />
        <BuildControls
          disabled={disabledInfo}
          ingredientAdded={props.onIngredientAdded}
          ingredientRemoved={props.onIngredientRemoved}
          price={props.totalPrice}
          purchasable={updatedPurchaseState(props.ingredients)}
          ordered={purchaseHandler}
          isAuth={props.isAuth}
        />
      </>
    );

    orderSummary = (
      <OrderSummary
        purchaseContinued={purchaseContinueHandler}
        purchaseCancelled={purchaseCancelHandler}
        ingredients={props.ingredients}
        total={props.totalPrice}
      />
    );
  }

  return (
    <>
      <Modal show={purchasing} modalClosed={purchaseCancelHandler}>
        {orderSummary}
      </Modal>
      {burger}
    </>
  );
};

const mapStateToProps = state => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
    isAuth: !!state.auth.token
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: name => dispatch(actions.addIngredient(name)),
    onIngredientRemoved: name => dispatch(actions.removeIngredient(name)),
    onInitIngredients: () => dispatch(actions.initIngredients()),
    onInitPurchase: () => dispatch(actions.purchaseInit()),
    onSetRedirectPath: path => dispatch(actions.setAuthRedirectPath(path))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withError(BurgerBuilder, axios));
