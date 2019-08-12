import React, { Component } from "react";
import Button from "../../../components/UI/Button/Button";
import axios from "../../../axios-orders";
import Spinner from "../../../components/UI/Spinner/Spinner";
import s from "./ContactData.module.css";

export class ContactData extends Component {
  state = {
    name: "",
    email: "",
    address: {
      stret: "",
      postalCode: ""
    },
    loading: false
  };

  orderHandler = e => {
    e.preventDefault();
    this.setState({ loading: true });
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      customer: {
        name: `qubit${Math.random() * 100}`,
        address: {
          street: "test street 2",
          country: "Narnia"
        },
        email: "none@mail.com"
      },
      delivery: "fast post"
    };
    axios
      .post("/orders.json", order)
      .then(res => {
        this.setState({ loading: false });
        this.props.history.push("/");
      })
      .catch(error => this.setState({ loading: false }));
  };
  render() {
    let form = (
      <form>
        <input
          className={s.Input}
          type="text"
          name="name"
          placeholder="Your name"
        />
        <input
          className={s.Input}
          type="email"
          name="email"
          placeholder="Your email"
        />
        <input
          className={s.Input}
          type="text"
          name="street"
          placeholder="Street"
        />
        <input
          className={s.Input}
          type="text"
          name="postal"
          placeholder="Postal"
        />
        <Button clicked={this.orderHandler} btnType="Success">
          ORDER
        </Button>
      </form>
    );

    if (this.state.loading) {
      form = <Spinner />;
    }
    return (
      <div className={s.ContactData}>
        <h4>Enter you Contact Data</h4>
        {form}
      </div>
    );
  }
}

export default ContactData;
