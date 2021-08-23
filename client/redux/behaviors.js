import * as ActionTypes from "./ActionTypes";
import { BEHAVIORS } from "../shared/behaviors";

export const Behaviors = (
  state = {
    isLoading: true,
    errMess: null,
    behaviors: [],
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.ADD_BEHAVIOR:
      return state.behaviors.concat(action.payload);

    case ActionTypes.EDIT_BEHAVIOR:
      console.log("editBehaviorReducer: ", action.payload);
      return state.behaviors.map((item) =>
        item.id == action.payload.id ? action.payload : item
      );

    case ActionTypes.DELETE_BEHAVIOR:
      return state.behaviors.filter((behavior) => behavior.id !== action.payload);

    case ActionTypes.RESET_BEHAVIORS:
      return BEHAVIORS;

    case ActionTypes.ADD_BEHAVIORS:
      console.log("ADD_BEHAVIORS");
      return {
        ...state,
        isLoading: false,
        errMess: null,
        behaviors: action.payload,
      };

    case ActionTypes.BEHAVIORS_LOADING:
      console.log("BEHAVIORS_LOADING");
      return { ...state, isLoading: true, errMess: null };

    case ActionTypes.BEHAVIORS_FAILED:
      console.log("BEHAVIORS_FAILED");
      return { ...state, isLoading: false, errMess: action.payload };

    default:
      return state;
  }
};
