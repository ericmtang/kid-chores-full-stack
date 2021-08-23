import * as ActionTypes from "./ActionTypes";
import { REWARDSQUEUE } from "../shared/rewardsQueue";

export const rewardsQueue = (state = REWARDSQUEUE, action) => {
  switch (action.type) {
    case ActionTypes.ADD_REWARDSQ:
      return state.concat(action.payload);

    case ActionTypes.EDIT_REWARDSQ:
      console.log("editRewardsQueueReducer: ", action.payload);
      return state.map((item) =>
        item.id == action.payload.id ? action.payload : item
      );

    case ActionTypes.APPROVE_REWARDSQ:
      console.log("approveRewardsQueueReducer: ", action.payload);
      const now = new Date();
      return state.map((item) =>
        item.id == action.payload
          ? item.fulfilled == null
            ? {
                ...item,
                fulfilled: now.toLocaleString("en-US", { hour12: true }),
              }
            : { ...item, fulfilled: null }
          : item
      );

    case ActionTypes.DELETE_REWARDSQ:
      console.log("deleteRewardsQueue", action.payload);
      return state.filter((reward) => reward.id !== action.payload);

    case ActionTypes.RESET_REWARDSQ:
      return REWARDSQUEUE;

    default:
      return state;
  }
};
