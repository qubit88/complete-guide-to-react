import React, { Component } from "react";
import Button from "../../../components/UI/Button/Button";

import s from "./ContactData.module.css";

export class ContactData extends Component {
  state = {
    name: "",
    email: "",
    address: {
      stret: "",
      postalCode: ""
    }
  };
  render() {
    return (
      <div className={s.ContactData}>
        <h4>Enter you Contact Data</h4>
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
          <Button btnType="Success">ORDER</Button>
        </form>
      </div>
    );
  }
}

export default ContactData;
