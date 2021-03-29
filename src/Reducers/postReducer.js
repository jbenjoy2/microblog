import {
  ADD_POST,
  EDIT_POST,
  REMOVE_POST,
  ADD_COMMENT,
  REMOVE_COMMENT,
  GET_POST,
  ADD_VOTE
} from "../Actions/actionTypes";



const rootReucer = (state = {}, action) => {
  switch (action.type) {
    case GET_POST:
      return {...state, [action.post.id]: action.post}
    case ADD_POST:
      return {...state, [action.post.id]: {...action.post, comments: []}}
    case EDIT_POST:
       
      return {
        ...state, [action.post.id]: { ...action.post, comments: state[action.post.id].comments }
      };
    case REMOVE_POST:
      let posts = { ...state };
      delete posts[action.postId];
      return posts;
    case ADD_COMMENT:
      const newComment = {
        ...state,
        [action.postId]: {
          ...state[action.postId],
          comments: [...state[action.postId].comments, action.comment]
        }
      };
      return newComment;
    case REMOVE_COMMENT:
      const deletedComment = {
        ...state,
        [action.postId]: {
          ...state[action.postId],
          comments: state[action.postId].comments.filter(c => c.id !== action.commentId)
        }
      };
      return deletedComment;
    case ADD_VOTE:
      return {...state, [action.postId]: {...state[action.postId], votes: action.votes}}
    default:
      return state;
  }

};

export default rootReucer;
