import * as ActionTypes from "./ActionTypes";
import { REWARDS } from "../shared/rewards";

export const Rewards = (
  state = {
    isLoading: true,
    errMess: null,
    rewards: [],
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.ADD_REWARD:
      return state.concat(action.payload);

    case ActionTypes.EDIT_REWARD:
      console.log("editRewardReducer: ", action.payload);
      return state.map((item) =>
        item.id == action.payload.id ? action.payload : item
      );

    case ActionTypes.DELETE_REWARD:
      return state.filter((reward) => reward.id !== action.payload);

    case ActionTypes.RESET_REWARDS:
      return REWARDS;

    case ActionTypes.ADD_REWARDS:
      console.log("ADD_REWARDS");
      return {
        ...state,
        isLoading: false,
        errMess: null,
        rewards: action.payload,
      };

    case ActionTypes.REWARDS_LOADING:
      console.log("REWARDS_LOADING");
      return { ...state, isLoading: true, errMess: null };

    case ActionTypes.REWARDS_FAILED:
      console.log("REWARDS_FAILED");
      return { ...state, isLoading: false, errMess: action.payload };

    default:
      return state;
  }
};
