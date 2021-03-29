import axios from "axios";
import { GET_ALL } from "./actionTypes";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api/posts";

export function getPostsApi() {
  return async function(dispatch) {
    const res = await axios.get(`${API_URL}`)
    return dispatch(getAllPosts(res.data))
  }
}


const getAllPosts = (postList) => {
  return {
    type: GET_ALL,
    postList
  }
}