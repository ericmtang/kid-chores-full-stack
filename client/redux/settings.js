import * as ActionTypes from "./ActionTypes";
import { SETTINGS } from "../shared/settings";

export const settings = (state = SETTINGS, action) => {
  switch (action.type) {
    case ActionTypes.ADD_SETTING:
      return state;

    case ActionTypes.EDIT_SETTING:
      return SETTINGS;

    case ActionTypes.DELETE_SETTING:
      return state;

    case ActionTypes.ADD_POINTS:
      const curPts = state.pointsToday;
      return { ...state, pointsToday: curPts + action.payload };

    case ActionTypes.RESET_SETTINGS:
      return SETTINGS;

    default:
      return state;
  }
};
