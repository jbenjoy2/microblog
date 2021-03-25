import {
  ADD_POST,
  EDIT_POST,
  REMOVE_POST,
  ADD_COMMENT,
  REMOVE_COMMENT
} from "../Actions/actionTypes";

const posts = window.localStorage.getItem("posts");
const allPosts = posts ? JSON.parse(posts) : {};

const rootReucer = (state = allPosts, action) => {
  switch (action.type) {
    case ADD_POST:
      const newPost = { ...state, [action.post.id]: { ...action.post, comments: [] } };
      window.localStorage.setItem("posts", JSON.stringify(newPost));
      return newPost;
    case EDIT_POST:
      const edited = {
        ...state,
        [action.post.id]: { ...action.post, comments: state[action.post.id].comments }
      };
      window.localStorage.setItem("posts", JSON.stringify(edited));
      return edited;
    case REMOVE_POST:
      let posts = { ...state };
      const newPosts = delete posts[action.postId];
      window.localStorage.setItem("posts", JSON.stringify(newPosts));
      return newPosts;
    case ADD_COMMENT:
      const newComment = {
        ...state,
        [action.postId]: {
          ...state[action.postId],
          comments: [...state[action.postId].comments, action.comment]
        }
      };
      window.localStorage.setItem("posts", JSON.stringify(newComment));
      return newComment;
    case REMOVE_COMMENT:
      const deletedComment = {
        ...state,
        [action.postId]: {
          ...state[action.postId],
          comments: state[action.postId].comments.filter(c => c.id !== action.commentId)
        }
      };
      window.localStorage.setItem("posts", JSON.stringify(deletedComment));
      return deletedComment;
    default:
      return state;
  }
};

export default rootReucer;
