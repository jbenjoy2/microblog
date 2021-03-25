import { combineReducers } from "redux";
import posts from "./postReducer";
import postList from "./postListReducer";

const rootReucer = combineReducers({ posts, postList });

export default rootReucer;
