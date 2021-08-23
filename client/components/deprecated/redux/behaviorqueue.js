import * as ActionTypes from "../../../redux/ActionTypes";
import { BEHAVIORQUEUE } from "../../../shared/behaviorQueue";

export const behaviorQueue = (state = BEHAVIORQUEUE, action) => {
  switch (action.type) {
    case ActionTypes.ADD_BEHAVIORQ:
      return state.concat(action.payload);

    case ActionTypes.EDIT_BEHAVIORQ:
      console.log("editBehaviorQueueReducer: ", action.payload);
      return state.map((item) =>
        item.id == action.payload.id ? action.payload : item
      );

    case ActionTypes.APPROVE_BEHAVIORQ:
      console.log("approveBehaviorQueueReducer: ", action.payload);
      const now = new Date();
      return state.map((item) =>
        item.id == action.payload
          ? item.approval == null
            ? {
                ...item,
                approval: now.toLocaleString("en-US", { hour12: true }),
              }
            : { ...item, approval: null }
          : item
      );

    case ActionTypes.DELETE_BEHAVIORQ:
      console.log("deleteBehaviorQueue", action.payload);
      return state.filter((behavior) => behavior.id !== action.payload);

    case ActionTypes.RESET_BEHAVIORQ:
      return BEHAVIORQUEUE;

    default:
      return state;
  }
};
