import * as ActionTypes from "./ActionTypes";

export const Family = (
  state = {
    isLoading: true,
    errMess: null,
    activeChild: null,
    family: [],
  },
  action
) => {
  switch (action.type) {

    case ActionTypes.RESET_FAMILY:
      return FAMILY;

    case ActionTypes.ADD_FAMILY:
      console.log("ADD_FAMILY");
      return {
        ...state,
        isLoading: false,
        errMess: null,
        family: action.payload,
      };

    case ActionTypes.FAMILY_LOADING:
      console.log("FAMILY_LOADING");
      return { ...state, isLoading: true, errMess: null };

    case ActionTypes.FAMILY_FAILED:
      console.log("FAMILY_FAILED");
      return { ...state, isLoading: false, errMess: action.payload };

    case ActionTypes.SET_ACTIVE_CHILD:
      console.log("SETTING ACTIVE CHILD:", action.payload);
      return {...state, activeChild: action.payload};

    default:
      return state;
  }
};