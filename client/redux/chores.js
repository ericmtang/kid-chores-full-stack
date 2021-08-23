import * as ActionTypes from "./ActionTypes";
import { CHORES } from "../shared/chores";

export const Chores = (
  state = {
    isLoading: true,
    errMess: null,
    chores: [],
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.ADD_CHORE:
      return state.concat(action.payload);

    case ActionTypes.EDIT_CHORE:
      console.log("editChoreQueueReducer: ", action.payload);
      return state.map((item) =>
        item.id == action.payload.id ? action.payload : item
      );

    case ActionTypes.DELETE_CHORE:
      return state.filter((chore) => chore.id !== action.payload);

    case ActionTypes.COMPLETE_CHORE:
      const now = new Date();
      return state.map((item) =>
        item.id == action.payload
          ? item.completed == null
            ? {
                ...item,
                completed: now.toLocaleString("en-US", { hour12: true }),
              }
            : { ...item, completed: null }
          : item
      );

    case ActionTypes.RESET_CHORES:
      return CHORES;

    case ActionTypes.ADD_CHORES:
      console.log("ADD_CHORES");
      return {
        ...state,
        isLoading: false,
        errMess: null,
        chores: action.payload,
      };

    case ActionTypes.CHORES_LOADING:
      console.log("CHORES_LOADING");
      return { ...state, isLoading: true, errMess: null };

    case ActionTypes.CHORES_FAILED:
      console.log("CHORES_FAILED");
      return { ...state, isLoading: false, errMess: action.payload };

    default:
      return state;
  }
};
