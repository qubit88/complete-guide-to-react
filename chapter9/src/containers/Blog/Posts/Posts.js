import React, { Component } from "react";
import axios from "../../../axios";
import Post from "../../../components/Post/Post";
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
    this.setState({ selectedPostId: id });
  };

  render() {
    let posts = <p style={{ textAlign: "center" }}>Something went wrong</p>;

    // if (!this.state.error) {
    posts = this.state.posts.map(post => (
      <Post
        clicked={() => this.postSelectedHandler(post.id)}
        key={post.id}
        title={post.title}
        author={post.author}
      />
    ));
    // }
    return <section className="Posts">{posts}</section>;
  }
}

export default Posts;