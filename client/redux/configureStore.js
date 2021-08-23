import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import logger from 'redux-logger';
import { Chores } from "./chores";
import { Behaviors } from "./behaviors";
import { Rewards } from "./rewards";
import { Family } from "./family";
import { settings } from "./settings";
//import { behaviorQueue } from "../components/deprecated/redux/behaviorqueue";
//import { rewardsQueue } from "../components/deprecated/redux/rewardsqueue";
import { Auth } from './auth';
import { persistStore, persistCombineReducers } from "redux-persist";
// import storage from "redux-persist/lib/storage";
import AsyncStorage from "@react-native-async-storage/async-storage";

const config = {
  key: "root",
  storage: AsyncStorage,
  debug: true,
  blacklist: ['Chores','Behaviors','Rewards']
};

export const ConfigureStore = () => {
  const store = createStore(
    persistCombineReducers(config, {
      Chores,
      Behaviors,
      Rewards,
      settings,
      Auth,
      Family,
    }),
    applyMiddleware(thunk)
  );

  const persistor = persistStore(store);

  return { persistor, store };
};
