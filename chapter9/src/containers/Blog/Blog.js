import React, { Component } from "react";
import { Route, NavLink, Switch, Redirect } from "react-router-dom";
import axios from "../../axios";
import Posts from "./Posts/Posts";
import asyncComponent from "../../hoc/asyncComponent";
// import NewPost from "./NewPost/NewPost";
import "./Blog.css";

const AsyncNewPost = asyncComponent(() => {
  return import("./NewPost/NewPost");
});

axios.defaults.baseURL = "https://jsonplaceholder.typicode.com/";
axios.defaults.headers.common["Authorization"] = "AUTH TOKEN";
axios.defaults.headers.post["Content-Type"] = "application/json";

class Blog extends Component {
  state = { auth: true };
  render() {
    return (
      <div className="Blog">
        <header>
          <nav>
            <ul>
              <li>
                <NavLink
                  activeStyle={{ color: "fa923f", textDecoration: "underline" }}
                  activeClassName="my-active"
                  to="/posts/"
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={{
                    pathname: "/new-post",
                    hash: "#something",
                    search: "?quick-submit=true"
                  }}
                >
                  New post
                </NavLink>
              </li>
            </ul>
          </nav>
        </header>

        {/* <section>
          <FullPost id={this.state.selectedPostId} />
        </section>
        <section>
          <NewPost />
        </section> */}
        <Switch>
          {this.state.auth.true ? (
            <Route path="/new-post" component={AsyncNewPost} />
          ) : null}
          <Route path="/posts/" component={Posts} />
          {/* <Redirect from="/" to="/posts" /> */}
          <Route render={() => <h1>Not Found</h1>} />
        </Switch>
      </div>
    );
  }
}

export default Blog;
