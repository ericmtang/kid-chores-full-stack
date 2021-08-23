import { ActionSheetIOS } from "react-native";
import * as ActionTypes from "./ActionTypes";

// The auth reducer. The starting state sets authentication
// based on a token being in local storage. In a real app,
// we would also want a util to check if the token is expired.
export const Auth = (
  state = {
    isLoading: false,
    isAuthenticated: false,
    token: null,
    user: null,
    errMess: null,
    isParent: null,
    userId: null,
    firstName: null,
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.LOGIN_REQUEST:
      return {
        ...state,
        isLoading: true,
        isAuthenticated: false,
        user: action.creds,
      };
    case ActionTypes.LOGIN_SUCCESS:
      console.log("Setting Auth Store State");
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        errMess: "",
        token: action.payload.token,
        userId: action.payload.userId,
        firstName: action.payload.firstName,
        isParent: action.payload.isParent,
        points: action.payload.points,
      };
    case ActionTypes.LOGIN_FAILURE:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false,
        errMess: action.message,
      };
    case ActionTypes.LOGOUT_REQUEST:
      return { ...state, isLoading: true, isAuthenticated: true };
    case ActionTypes.LOGOUT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false,
        token: "",
        user: null,
        userId: null,
        firstName: null,
        isParent: null,
      };
    default:
      return state;
  }
};
