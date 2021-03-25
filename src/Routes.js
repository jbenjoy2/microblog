import React, { useState } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Home from "./Components/Home";
import NewPostForm from "./Components/NewPostForm";
import PostDetails from "./Components/PostDetails";
import { v4 as uuid } from "uuid";
import useLocalStorage from "./hooks/useLocalStorage";
function Routes() {
  const [posts, setPosts] = useLocalStorage("posts", [
    {
      id: "abcd",
      title: "test",
      description: "test post",
      body:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae, facilis ipsum mollitia tenetur corporis eveniet ea, officiis, architecto eum suscipit eligendi fugiat ex a rem! Quia velit iusto amet delectus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum assumenda in, enim distinctio eos, molestiae doloribus vitae eveniet velit dignissimos aliquam architecto numquam. Ex obcaecati vitae eos! Non, voluptas qui."
    },
    {
      id: "abcde",
      title: "test",
      description: "test post",
      body: "adifjaldkfjakldjaoiejiorjpabcdefghijklmnop"
    },
    {
      id: "abcdefg",
      title: "test",
      description: "test post",
      body: "adifjaldkfjakldjaoiejiorjp"
    }
  ]);

  const addPost = postObj => {
    setPosts(posts => [...posts, { ...postObj, id: uuid() }]);
  };

  const formSubmit = (
    e,
    addFunc,
    data,
    route,
    history,
    id = undefined,
    stateFunc = undefined,
    newState = undefined
  ) => {
    e.preventDefault();
    addFunc(data, id);
    history.push(route);
    stateFunc(newState);
  };

  const editPost = (data, postId) => {
    setPosts(posts =>
      posts.map(post => {
        if (post.id === postId) {
          return { ...post, ...data };
        }
        return post;
      })
    );
  };

  const handleDelete = postId => {
    setPosts(posts => posts.filter(post => postId !== post.id));
  };
  return (
    <Switch>
      <Route exact path="/">
        <Home posts={posts} />
      </Route>
      <Route exact path="/new">
        <NewPostForm add={addPost} submit={formSubmit} route="/" />
      </Route>
      <Route exact path="/:postId">
        <PostDetails posts={posts} edit={editPost} submit={formSubmit} deletePost={handleDelete} />
      </Route>
      <Redirect to="/" />
    </Switch>
  );
}

export default Routes;
