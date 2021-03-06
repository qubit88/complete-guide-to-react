import React, { Component } from "react";
import Aux from "../../../hoc/Auxilliary";
import AuthContext from "../../../context/auth-context";
import withClass from "../../../hoc/WithClass";
import classes from "./Person.module.css";

class Person extends Component {
  constructor(props) {
    super(props);
    this.inputElementRef = React.createRef();
  }

  static contextType = AuthContext;
  componentDidMount() {
    // this.inputElement.focus();

    this.inputElementRef.current.focus();
    console.log(this.context.authenticated);
  }
  render() {
    console.log("[Person.js] rendering...");

    return (
      <Aux>
        {this.context.authenticated ? (
          <p>Authenticated!</p>
        ) : (
          <p>Please, log in</p>
        )}

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
