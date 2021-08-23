import { combineReducers } from "redux";
//import {APPEND_MESSAGE} from '../Actions/appendMessage.js';
//import {IS_TYPING} from '../Actions/isTyping';
//import {JUST_JOINED} from '../Actions/justJoined';
//import {NOT_TYPING} from '../Actions/notTyping';
import ActionTypes from "./ActionTypes";

export const WebSocket = (
  state = {
    messages: [],
    typist: null,
    joined: false,
  },
  action
) => {
  switch (action.type) {
    case APPEND_MESSAGE:
      const temp = [...state.messages, action.payload];
      return {
        ...state,
        messages: temp,
      };
    case IS_TYPING:
      return {
        ...state,
        typist: action.payload.handle,
      };
    case JUST_JOINED:
      return {
        ...state,
        joined: action.payload.success,
      };
    case NOT_TYPING:
      return {
        ...state,
        typist: null,
      };
    default:
      return state;
  }
};
