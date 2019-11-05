import React, { useState, useEffect } from "react";
import Modal from "../../components/UI/Modal/Modal";
import useHttpErrorHandler from "../../hooks/http-error-handler";

const withError = (WrappedComponent, axios) => {
  return function(props) {
    const [error, errorClear] = useHttpErrorHandler(axios);
    return (
      <>
        <Modal modalClosed={errorClear} show={error}>
          {error ? error.message : null}
        </Modal>
        <WrappedComponent {...props} />;
      </>
    );
  };
};

export default withError;
