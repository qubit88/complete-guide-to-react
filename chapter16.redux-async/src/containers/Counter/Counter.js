import React, { Component } from "react";
import { connect } from "react-redux";
import * as actionCreators from "../../store/actions";
import CounterControl from "../../components/CounterControl/CounterControl";
import CounterOutput from "../../components/CounterOutput/CounterOutput";

class Counter extends Component {
  state = {
    counter: 0
  };

  counterChangedHandler = (action, value) => {
    switch (action) {
      case "inc":
        this.setState(prevState => {
          return { counter: prevState.counter + 1 };
        });
        break;
      case "dec":
        this.setState(prevState => {
          return { counter: prevState.counter - 1 };
        });
        break;
      case "add":
        this.setState(prevState => {
          return { counter: prevState.counter + value };
        });
        break;
      case "sub":
        this.setState(prevState => {
          return { counter: prevState.counter - value };
        });
        break;
      default:
        return this.state;
    }
  };

  render() {
    return (
      <div>
        <CounterOutput value={this.props.ctr} />
        <CounterControl
          label="Increment"
          clicked={this.props.onIncrementCounter}
        />
        <CounterControl
          label="Decrement"
          clicked={this.props.onDecrementCounter}
        />
        <CounterControl label="Add 5" clicked={this.props.onAddCounter} />
        <CounterControl
          label="Subtract 5"
          clicked={this.props.onSubstructCounter}
        />
        <hr></hr>
        <button onClick={() => this.props.onStoreResult(this.props.ctr)}>
          Store Result
        </button>
        <ul>
          {this.props.results.map(res => {
            return (
              <li
                key={res.id}
                onClick={() => this.props.onDeleteResult(res.id)}
              >
                {res.value}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    ctr: state.counter.counter,
    results: state.results.results
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onIncrementCounter: () => dispatch(actionCreators.increment()),
    onDecrementCounter: () => dispatch(actionCreators.decrement()),
    onAddCounter: () => dispatch(actionCreators.add(5)),
    onSubstructCounter: () => dispatch(actionCreators.substract(5)),
    onStoreResult: result => dispatch(actionCreators.store_result(result)),
    onDeleteResult: resultElId =>
      dispatch(actionCreators.delete_result(resultElId))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Counter);
