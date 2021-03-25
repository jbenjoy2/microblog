import { ADD_POST, EDIT_POST, REMOVE_POST } from "../Actions/actionTypes";
const titles = window.localStorage.getItem("titles");
const titlesList = titles ? JSON.parse(titles) : [];
const INITIAL_STATE = titlesList;

const rootReucer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_POST:
      const newState = [...state, { ...action.post }];
      window.localStorage.setItem("titles", JSON.stringify(newState));
      return newState;
    case EDIT_POST:
      const edited = state.map(post => (post.id === action.post.id ? { ...action.post } : post));
      window.localStorage.setItem("titles", JSON.stringify(edited));
      return edited;
    case REMOVE_POST:
      const deletedState = state.filter(post => post.id !== action.postId);
      window.localStorage.setItem("titles", JSON.stringify(deletedState));
      return deletedState;
    default:
      return state;
  }
};

export default rootReucer;
