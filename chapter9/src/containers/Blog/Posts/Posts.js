import React, { Component } from "react";
import { Route } from "react-router-dom";
import axios from "../../../axios";
import Post from "../../../components/Post/Post";
import FullPost from "../FullPost/FullPost";
import "./Posts.css";

class Posts extends Component {
  state = {
    posts: []
  };

  componentDidMount() {
    console.log(this.props);
    axios
      .get("/posts/")
      .then(res => {
        const posts = res.data.slice(0, 4);
        const updatedPosts = posts.map(post => ({ ...post, author: "Max" }));
        this.setState({ posts: updatedPosts });
        //   console.log(res);
      })
      .catch(error => console.log(error));
  }

  postSelectedHandler = id => {
    this.props.history.push({ pathname: "/posts/" + id });
  };

  render() {
    let posts = <p style={{ textAlign: "center" }}>Something went wrong</p>;

    // if (!this.state.error) {
    posts = this.state.posts.map(post => (
      <Post
        key={post.id}
        clicked={() => this.postSelectedHandler(post.id)}
        title={post.title}
        author={post.author}
      />
    ));
    // }
    return (
      <div>
        <section className="Posts">{posts}</section>
        <Route
          to={`${this.props.match.url}/:id`}
          exact
          render={props => <FullPost {...props} />}
        />
      </div>
    );
  }
}

export default Posts;
