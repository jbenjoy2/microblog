import React, { useState } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Home from "./Components/Home";
import NewPostForm from "./Components/NewPostForm";
import PostDetails from "./Components/PostDetails";
import { v4 as uuid } from "uuid";
import useLocalStorage from "./hooks/useLocalStorage";
import { useSelector, useDispatch } from "react-redux";
import { ADD_POST } from "./Actions/actionTypes";
function Routes() {
  const posts = useSelector(st => st.posts);
  console.log(posts);
  const dispatch = useDispatch();

  const addPost = postObj => {
    dispatch({
      type: ADD_POST,
      post: { ...postObj, id: uuid() }
    });
  };

  return (
    <Switch>
      <Route exact path="/">
        <Home posts={posts} />
      </Route>
      <Route exact path="/new">
        <NewPostForm submit={addPost} destination="/" />
      </Route>
      <Route exact path="/:postId">
        <PostDetails posts={posts} />
      </Route>
      <Redirect to="/" />
    </Switch>
  );
}

export default Routes;
