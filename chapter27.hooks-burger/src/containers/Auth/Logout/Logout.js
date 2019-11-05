import React, { useEffect } from "react";
import { Redirect } from "react-router-dom";
import * as actions from "../../../store/actions";
import { connect } from "react-redux";

const Logout = props => {
  useEffect(() => {
    props.onLogout();
  }, []);

  return <Redirect to="/" />;
};

const mapDispatchToProps = dispatch => ({
  onLogout: () => dispatch(actions.logout())
});

export default connect(
  null,
  mapDispatchToProps
)(Logout);
