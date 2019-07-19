import React, { Component } from "react";
import { Route, NavLink } from "react-router-dom";
import axios from "../../axios";
import Posts from "./Posts/Posts";
import NewPost from "./NewPost/NewPost";
import "./Blog.css";

axios.defaults.baseURL = "https://jsonplaceholder.typicode.com/";
axios.defaults.headers.common["Authorization"] = "AUTH TOKEN";
axios.defaults.headers.post["Content-Type"] = "application/json";

class Blog extends Component {
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
                  exact
                  to="/"
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
        <Route path="/" exact component={Posts} />
        <Route path="/new-post" component={NewPost} />
      </div>
    );
  }
}

export default Blog;
