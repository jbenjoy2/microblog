import { ADD_POST, EDIT_POST, GET_ALL, REMOVE_POST } from "../Actions/actionTypes";

const getTitleParams = ({id, title, description, votes}) => {
  return {id, title, description, votes}
}

const rootReucer = (state = [], action) => {
  switch (action.type) {
    case GET_ALL:
      return [...action.postList]
    case ADD_POST:
      return [...state, getTitleParams(action.post)]
    case EDIT_POST:
      return state.map(post => (post.id === action.post.id ? getTitleParams(action.post) : post));
    case REMOVE_POST:
      return state.filter(post => post.id !== action.postId);
    default:
      return state;
  }
};

export default rootReucer;
