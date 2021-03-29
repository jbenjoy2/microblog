import React, { useState } from "react";
import { Switch, Route, Redirect, useHistory } from "react-router-dom";
import Home from "./Components/Home";
import NewPostForm from "./Components/NewPostForm";
import PostDetails from "./Components/PostDetails";
import { v4 as uuid } from "uuid";
import useLocalStorage from "./hooks/useLocalStorage";
import { useSelector, useDispatch } from "react-redux";
import { ADD_POST } from "./Actions/actionTypes";
import { addPostApi } from "./Actions/posts";
function Routes() {
  const dispatch = useDispatch();
  const history = useHistory()
  const addPost = ({title, description, body})=> {
    dispatch(addPostApi(title, description,body));
    history.push('/')
  };

  const cancel = () => {
    history.push('/')
  }

  
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route exact path="/new">
        <NewPostForm submit={addPost} cancel={cancel} />
      </Route>
      <Route exact path="/:postId">
        <PostDetails />
      </Route>
      <Redirect to="/" />
    </Switch>
  );
}

export default Routes;
