import React from "react";
import fetch from "isomorphic-unfetch";

import User from "../../components/User";

const authIndexPage = ({ userAgent }) => {
  return (
    <div>
      <h1>Auth page - You have {userAgent}</h1>
      <User name="Mila" />
      <style jsx>
        {`
          div {
            border: 1px solid red;
            padding: 20px;
          }
        `}
      </style>
    </div>
  );
};

authIndexPage.getInitialProps = async ({ req }) => {
  const userAgent = req ? req.headers["user-agent"] : navigator.userAgent;
  return { userAgent };
};

export default authIndexPage;
