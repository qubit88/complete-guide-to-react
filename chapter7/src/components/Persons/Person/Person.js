import React, { Component } from "react";
import Aux from "../../../hoc/Auxilliary";
import withClass from "../../../hoc/WithClass";

import classes from "./Person.module.css";

class Person extends Component {
  constructor(props) {
    super(props);
    this.inputElementRef = React.createRef();
  }
  componentDidMount() {
    // this.inputElement.focus();

    this.inputElementRef.current.focus();
  }
  render() {
    console.log("[Person.js] rendering...");

    return (
      <Aux>
        <div className={classes.Person}>
          <p onClick={this.props.click}>
            I'm {this.props.name} and I am {this.props.age} years old!
          </p>
          <p>{this.props.children}</p>
          <input
            type="text"
            // ref={inputEl => {
            //   inputEl.focus();
            // }}
            ref={this.inputElementRef}
            onChange={this.props.changed}
            value={this.props.name}
          />
        </div>
      </Aux>
    );
  }
}

export default withClass(Person, classes.Person);
