import React, { Component } from "react";
import Button from "../../UI/Button/Button";

class OrderSummary extends Component {
  componentWillUpdate() {
    console.log("will update order summary");
  }

  render() {
    const ingredientSummary = Object.keys(this.props.ingredients).map(key => (
      <li key={key}>
        <span style={{ textTransform: "capitalize" }}>{key}</span>:
        {this.props.ingredients[key]}
      </li>
    ));

    return (
      <>
        <h3>Your order</h3>
        <p>A delicious burger with the following ingredients:</p>
        <ul>{ingredientSummary}</ul>
        <p>
          <strong>Total price</strong>: {this.props.total.toFixed(2)}
        </p>
        <p>Continue to checkout</p>
        <Button clicked={this.props.purchaseCancelled} btnType="Danger">
          CANCEL
        </Button>
        <Button clicked={this.props.purchaseContinued} btnType="Success">
          CONTINUE
        </Button>
      </>
    );
  }
}

export default OrderSummary;
