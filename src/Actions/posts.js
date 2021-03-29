import axios from "axios";
import {
  GET_POST,
  ADD_POST,
  REMOVE_POST,
  EDIT_POST,
  REMOVE_COMMENT,
  ADD_COMMENT,
  ADD_VOTE
} from "./actionTypes";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api/posts";

export function getPostApi(id) {
  return async function(dispatch) {
    const res = await axios.get(`${API_URL}/${id}`);
    return dispatch(getPost(res.data));
  };
}

const getPost = post => {
  return {
    type: GET_POST,
    post
  };
};

export function addPostApi(title, description, body) {
  return async function(dispatch) {
    const res = await axios.post(`${API_URL}`, {
      title,
      description,
      body
    });
    return dispatch(addPost(res.data));
  };
}

const addPost = post => {
  return {
    type: ADD_POST,
    post
  };
};

export function deletePostApi(postId) {
  return async function(dispatch) {
    await axios.delete(`${API_URL}/${postId}`);
    return dispatch(removePost(postId));
  };
}

const removePost = postId => {
  return {
    type: REMOVE_POST,
    postId
  };
};

export function editPostApi(id, title, description, body) {
  return async function(dispatch) {
    const res = await axios.put(`${API_URL}/${id}`, { title, description, body });
    return dispatch(editPost(res.data));
  };
}

const editPost = post => {
  return {
    type: EDIT_POST,
    post
  };
};

export function deleteCommentApi(postId, commentId) {
  return async function(dispatch) {
    await axios.delete(`${API_URL}/${postId}/comments/${commentId}`);
    return dispatch(removeComment(postId, commentId));
  };
}

const removeComment = (postId, commentId) => {
  return {
    type: REMOVE_COMMENT,
    postId,
    commentId
  };
};

export function addCommentApi(postId, text) {
  return async function(dispatch) {
    const res = await axios.post(`${API_URL}/${postId}/comments`, { text });
    return dispatch(addComment(postId, res.data));
  };
}

const addComment = (postId, comment) => {
  return {
    type: ADD_COMMENT,
    postId,
    comment
  };
};

export function addVoteApi(postId, direction) {
  return async function(dispatch) {
    const res = await axios.post(`${API_URL}/${postId}/vote/${direction}`);
    return dispatch(addVote(postId, res.data.votes));
  };
}

const addVote = (postId, votes) => {
  return {
    type: ADD_VOTE,
    postId,
    votes
  };
};
