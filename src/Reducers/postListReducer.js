import { ADD_POST, ADD_VOTE, EDIT_POST, GET_ALL, REMOVE_POST } from "../Actions/actionTypes";

const getTitleParams = ({ id, title, description, votes }) => {
  return { id, title, description, votes };
};

const sort = posts => {
  return posts.sort((a, b) => b.votes - a.votes);
};
const rootReucer = (state = [], action) => {
  switch (action.type) {
    case GET_ALL:
      return sort([...action.postList]);
    case ADD_POST:
      return sort([...state, getTitleParams(action.post)]);
    case EDIT_POST:
      return state.map(post => (post.id === action.post.id ? getTitleParams(action.post) : post));
    case REMOVE_POST:
      return state.filter(post => post.id !== action.postId);
    case ADD_VOTE:
      return sort(
        state.map(post => (post.id === action.postId ? { ...post, votes: action.votes } : post))
      );
    default:
      return state;
  }
};

export default rootReucer;
