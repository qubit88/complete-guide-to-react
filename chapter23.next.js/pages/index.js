import React, { Component } from "react";
import Link from "next/link";
import Router from "next/router";

class indexPage extends Component {
  static getInitialProps(context) {
    const promise = new Promise((res, rej) => {
      setTimeout(() => {
        res({ appName: "Super App" });
      }, 1000);
    });
    return promise;
  }
  render() {
    return (
      <div>
        <h1>Main Page of {this.props.appName}</h1>
        <p>
          <Link href="/auth">
            <a>Auth</a>
          </Link>
          <button onClick={() => Router.push("/auth")}>Go to Auth</button>
        </p>
      </div>
    );
  }
}

export default indexPage;
