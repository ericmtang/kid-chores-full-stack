import * as ActionTypes from "./ActionTypes";
import { baseUrl } from "../shared/baseUrl";
import axios from "axios";
import { ConfigureStore } from "./configureStore";
//import RNFetchBlob from "rn-fetch-blob";
import { useSelector, useDispatch } from "react-redux";

const { persistor, store } = ConfigureStore();
//const state = store.getState();
//console.log("CurrentStore:", state);
//const state = useSelector((state)=>state);
//const stateAuth = state.Auth;
//console.log("CurrentStore/Auth:", stateAuth);
//const testToken = state.Auth.token;
//console.log("global testToken:", testToken);

export const fetchChores = () => (dispatch) => {
  dispatch(choresLoading());

  const state = store.getState();
  console.log("CurrentAuthStore:", state.Auth.userId);
  const authToken = state.Auth.token;
  console.log("authToken:", authToken);

  console.log("Fetching Chores using: ", baseUrl + "chores");
  return fetch(baseUrl + "chores", {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  })
    .then(
      (response) => {
        //console.log("Fetch Response: ", response);
        if (response.ok) {
          return response;
        } else {
          //console.log("Fetch Error 1: ", response);
          const error = new Error(
            `Error ${response.status}: ${response.statusText}`
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        //console.log("Fetch Error 2: ", error);
        //console.log(error);
        const errMess = new Error(error.message);
        throw errMess;
      }
    )
    .then((response) => {
      //console.log("fetchChores resp:", response);
      return response.json();
    })
    .then((chores) => {
      //console.log("fetchChores dispatch:", chores);
      dispatch(addChores(chores));
    })
    .catch((error) => {
      console.log("Reward Fetch Catch Error: ", error);
      dispatch(choresFailed(error.message));
    });
};

export const chooseChore = (chore) => (dispatch) => {
  const state = store.getState();
  console.log("CurrentAuthStore:", state.Auth);
  const authToken = state.Auth.token;
  console.log("authToken:", authToken);
  console.log("Choosing Chore using: ", baseUrl + "chores");
  delete chore._id;
  delete chore.createdAt;
  delete chore.updatedAt;
  console.log("chooseChore object: ", chore);
  return fetch(baseUrl + "chores", {
    method: "POST",
    body: JSON.stringify(chore),
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
    },
  })
    .then(
      (response) => {
        //console.log("Fetch Response: ", response);
        if (response.ok) {
          return response;
        } else {
          //console.log("Fetch Error 1: ", response);
          const error = new Error(
            `Error ${response.status}: ${response.statusText}`
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        console.log("Fetch Error 2: ", error);
        console.log(error);
        const errMess = new Error(error.message);
        throw errMess;
      }
    )
    .then((response) => {
      //console.log("ChooseChore Pre-JSON: ", response);
      return response.json();
    })
    .then((chores) => {
      console.log("ChooseChore dispatch: ", chores);
      dispatch(addChores(chores));
    })
    .catch((error) => {
      console.log("Catch Error: ", error);
      dispatch(choresFailed(error.message));
    });
};

export const updateChore = (chore) => (dispatch) => {
  const state = store.getState();
  console.log("CurrentAuthStore:", state.Auth.userId);
  const authToken = state.Auth.token;
  console.log("authToken:", authToken);
  console.log("Updating Chore using: ", baseUrl + "chores");
  console.log("updateChore object: ", chore);
  return fetch(baseUrl + "chores/" + chore._id, {
    method: "PUT",
    body: JSON.stringify(chore),
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
    },
  })
    .then(
      (response) => {
        //console.log("Fetch Response: ", response);
        if (response.ok) {
          return response;
        } else {
          //console.log("Fetch Error 1: ", response);
          const error = new Error(
            `Error ${response.status}: ${response.statusText}`
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        console.log("Fetch Error 2: ", error);
        console.log(error);
        const errMess = new Error(error.message);
        throw errMess;
      }
    )
    .then((response) => {
      //console.log(response);
      return response.json();
    })
    .then((chores) => {
      //console.log(chores);
      dispatch(addChores(chores));
    })
    .catch((error) => {
      console.log("Catch Error: ", error);
      dispatch(choresFailed(error.message));
    });
};

export const deleteChore = (id) => (dispatch) => {
  const state = store.getState();
  console.log("CurrentAuthStore:", state.Auth);
  const authToken = state.Auth.token;
  console.log("authToken:", authToken);
  console.log("Deleting Chore using: ", baseUrl + "chores");
  console.log("deleteChore id: ", id);
  return fetch(baseUrl + "chores/" + id, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
    credentials: "same-origin",
  })
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          const error = new Error(
            `Error ${response.status}: ${response.statusText}`
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        throw error;
      }
    )
    .then((response) => response.json())
    .then((chores) => {
      console.log("Chore Deleted", chores);
      dispatch(addChores(chores));
    })
    .catch((error) => dispatch(choresFailed(error.message)));
};

export const addChores = (chores) => ({
  type: ActionTypes.ADD_CHORES,
  payload: chores,
});
export const choresLoading = () => ({
  type: ActionTypes.CHORES_LOADING,
});
export const choresFailed = (errMess) => ({
  type: ActionTypes.CHORES_FAILED,
  payload: errMess,
});
export const addChore = (chore) => ({
  type: ActionTypes.ADD_CHORE,
  payload: chore,
});
export const editChore = (chore) => ({
  type: ActionTypes.EDIT_CHORE,
  payload: chore,
});
export const completeChore = (id) => ({
  type: ActionTypes.COMPLETE_CHORE,
  payload: id,
});

/*
export const fetchBehaviors = () => {
    console.log("Fetching Behaviors using: ", baseUrl + "behaviors");
    const authToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTFjNmJhN2ZlMzRhYjYwMWMyMWEyOWMiLCJpYXQiOjE2MjkzMjkwNjYsImV4cCI6MTYyOTMzMjY2Nn0.gRdqJm2hXxD6yjARX53ZN0zkwRGLCipktjFxb7Sa7HE";
    return dispatch => {
        dispatch(behaviorsLoading());
        axios
        .get(baseUrl+"behaviors",  {
            headers: {
               Authorization: "Bearer " + authToken
            }
         })
        .then(response => {
            console.log("AXIOS GET Response: ", response);
            dispatch(addBehaviors(response));
        })
        .catch(error => dispatch(behaviorsFailed(error)));
    };
};
*/

export const fetchBehaviors = () => (dispatch) => {
  dispatch(behaviorsLoading());
  const state = store.getState();
  console.log("CurrentAuthStore:", state.Auth.userId);
  const authToken = state.Auth.token;
  console.log("authToken:", authToken);

  console.log("Fetching Behaviors using: ", baseUrl + "behaviors");
  return fetch(baseUrl + "behaviors", {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  })
    .then(
      (response) => {
        //console.log("Fetch Response: ", response);
        if (response.ok) {
          return response;
        } else {
          //console.log("Fetch Error 1: ", response);
          const error = new Error(
            `Error ${response.status}: ${response.statusText}`
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        //console.log("Fetch Error 2: ", error);
        //console.log(error);
        const errMess = new Error(error.message);
        throw errMess;
      }
    )
    .then((response) => {
      //console.log(response);
      return response.json();
    })
    .then((behaviors) => {
      //console.log(behaviors);
      dispatch(addBehaviors(behaviors));
    })
    .catch((error) => {
      console.log("Behavior Fetch Catch Error: ", error);
      dispatch(behaviorsFailed(error.message));
    });
};

export const chooseBehavior = (behavior) => (dispatch) => {
  const state = store.getState();
  console.log("CurrentAuthStore:", state.Auth);
  const authToken = state.Auth.token;
  console.log("authToken:", authToken);
  console.log("Choosing Behavior using: ", baseUrl + "behaviors");
  delete behavior._id;
  delete behavior.createdAt;
  delete behavior.updatedAt;
  console.log("chooseBehavior object: ", behavior);
  return fetch(baseUrl + "behaviors", {
    method: "POST",
    body: JSON.stringify(behavior),
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
    },
  })
    .then(
      (response) => {
        //console.log("Fetch Response: ", response);
        if (response.ok) {
          return response;
        } else {
          //console.log("Fetch Error 1: ", response);
          const error = new Error(
            `Error ${response.status}: ${response.statusText}`
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        console.log("Fetch Error 2: ", error);
        console.log(error);
        const errMess = new Error(error.message);
        throw errMess;
      }
    )
    .then((response) => {
      //console.log("ChooseBehavior Pre-JSON: ", response);
      return response.json();
    })
    .then((behaviors) => {
      console.log("ChooseBehavior dispatch: ", behaviors);
      dispatch(addBehaviors(behaviors));
    })
    .catch((error) => {
      console.log("Catch Error: ", error);
      dispatch(behaviorsFailed(error.message));
    });
};

export const updateBehavior = (behavior) => (dispatch) => {
  const state = store.getState();
  console.log("CurrentAuthStore:", state.Auth);
  const authToken = state.Auth.token;
  console.log("authToken:", authToken);
  console.log("Updating Behavior using: ", baseUrl + "behaviors");
  console.log("updateBehavior object: ", behavior);
  return fetch(baseUrl + "behaviors/" + behavior._id, {
    method: "PUT",
    body: JSON.stringify(behavior),
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
    },
  })
    .then(
      (response) => {
        //console.log("Fetch Response: ", response);
        if (response.ok) {
          return response;
        } else {
          //console.log("Fetch Error 1: ", response);
          const error = new Error(
            `Error ${response.status}: ${response.statusText}`
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        console.log("Fetch Error 2: ", error);
        console.log(error);
        const errMess = new Error(error.message);
        throw errMess;
      }
    )
    .then((response) => {
      //console.log(response);
      return response.json();
    })
    .then((behaviors) => {
      console.log(behaviors);
      dispatch(addBehaviors(behaviors));
    })
    .catch((error) => {
      console.log("Catch Error: ", error);
      dispatch(behaviorsFailed(error.message));
    });
};

export const deleteBehavior = (id) => (dispatch) => {
  const state = store.getState();
  console.log("CurrentAuthStore:", state.Auth);
  const authToken = state.Auth.token;
  console.log("authToken:", authToken);
  console.log("Deleting Behavior using: ", baseUrl + "behaviors");
  console.log("deleteBehavior id: ", id);
  return fetch(baseUrl + "behaviors/" + id, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
    credentials: "same-origin",
  })
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          const error = new Error(
            `Error ${response.status}: ${response.statusText}`
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        throw error;
      }
    )
    .then((response) => response.json())
    .then((behaviors) => {
      console.log("Behavior Deleted", behaviors);
      dispatch(addBehaviors(behaviors));
    })
    .catch((error) => dispatch(behaviorsFailed(error.message)));
};

export const behaviorsLoading = () => ({
  type: ActionTypes.BEHAVIORS_LOADING,
});
export const behaviorsFailed = (errMess) => ({
  type: ActionTypes.BEHAVIORS_FAILED,
  payload: errMess,
});
export const addBehaviors = (behaviors) => ({
  type: ActionTypes.ADD_BEHAVIORS,
  payload: behaviors,
});
export const addBehavior = (behavior) => ({
  type: ActionTypes.ADD_BEHAVIOR,
  payload: behavior,
});
export const editBehavior = (behavior) => ({
  type: ActionTypes.EDIT_BEHAVIOR,
  payload: behavior,
});

export const deleteBehaviorQ = (id) => ({
  type: ActionTypes.DELETE_BEHAVIORQ,
  payload: id,
});
export const addBehaviorQ = (behavior) => ({
  type: ActionTypes.ADD_BEHAVIORQ,
  payload: behavior,
});
export const approveBehaviorQ = (id) => ({
  type: ActionTypes.APPROVE_BEHAVIORQ,
  payload: id,
});

export const fetchRewards = () => (dispatch) => {
  dispatch(rewardsLoading());
  const state = store.getState();
  console.log("CurrentAuthStore:", state.Auth.userId);
  const authToken = state.Auth.token;
  console.log("authToken:", authToken);

  console.log("Fetching Rewards using: ", baseUrl + "rewards");
  return fetch(baseUrl + "rewards", {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  })
    .then(
      (response) => {
        //console.log("Fetch Response: ", response);
        if (response.ok) {
          return response;
        } else {
          //console.log("Fetch Error 1: ", response);
          const error = new Error(
            `Error ${response.status}: ${response.statusText}`
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        //console.log("Fetch Error 2: ", error);
        //console.log(error);
        const errMess = new Error(error.message);
        throw errMess;
      }
    )
    .then((response) => {
      //console.log("FetchRewards Pre-JSON: ", response);
      return response.json();
    })
    .then((rewards) => {
      //console.log("FetchRewards dispatch: ", rewards);
      dispatch(addRewards(rewards));
    })
    .catch((error) => {
      console.log("Reward Fetch Catch Error: ", error);
      dispatch(rewardsFailed(error.message));
    });
};

export const chooseReward = (reward) => (dispatch) => {
  const state = store.getState();
  console.log("CurrentAuthStore:", state.Auth);
  const authToken = state.Auth.token;
  console.log("authToken:", authToken);
  console.log("Choosing Reward using: ", baseUrl + "rewards");
  delete reward._id;
  delete reward.createdAt;
  delete reward.updatedAt;
  console.log("chooseReward object: ", reward);
  return fetch(baseUrl + "rewards", {
    method: "POST",
    body: JSON.stringify(reward),
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
    },
  })
    .then(
      (response) => {
        //console.log("Fetch Response: ", response);
        if (response.ok) {
          return response;
        } else {
          //console.log("Fetch Error 1: ", response);
          const error = new Error(
            `Error ${response.status}: ${response.statusText}`
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        console.log("Fetch Error 2: ", error);
        console.log(error);
        const errMess = new Error(error.message);
        throw errMess;
      }
    )
    .then((response) => {
      //console.log(response);
      return response.json();
    })
    .then((rewards) => {
      console.log(rewards);
      dispatch(addRewards(rewards));
    })
    .catch((error) => {
      console.log("Catch Error: ", error);
      dispatch(rewardsFailed(error.message));
    });
};

export const updateReward = (reward) => (dispatch) => {
  const state = store.getState();
  console.log("CurrentAuthStore:", state.Auth);
  const authToken = state.Auth.token;
  console.log("authToken:", authToken);
  console.log("Updating Reward using: ", baseUrl + "rewards");
  console.log("updateReward object: ", reward);
  return fetch(baseUrl + "rewards/" + reward._id, {
    method: "PUT",
    body: JSON.stringify(reward),
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
    },
  })
    .then(
      (response) => {
        //console.log("Fetch Response: ", response);
        if (response.ok) {
          return response;
        } else {
          //console.log("Fetch Error 1: ", response);
          const error = new Error(
            `Error ${response.status}: ${response.statusText}`
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        console.log("Fetch Error 2: ", error);
        console.log(error);
        const errMess = new Error(error.message);
        throw errMess;
      }
    )
    .then((response) => {
      //console.log(response);
      return response.json();
    })
    .then((rewards) => {
      console.log(rewards);
      dispatch(addRewards(rewards));
    })
    .catch((error) => {
      console.log("Catch Error: ", error);
      dispatch(rewardsFailed(error.message));
    });
};

export const deleteReward = (id) => (dispatch) => {
  const state = store.getState();
  console.log("CurrentAuthStore:", state.Auth);
  const authToken = state.Auth.token;
  console.log("authToken:", authToken);
  console.log("Deleting Reward using: ", baseUrl + "rewards");
  console.log("deleteReward id: ", id);
  return fetch(baseUrl + "rewards/" + id, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
    credentials: "same-origin",
  })
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          const error = new Error(
            `Error ${response.status}: ${response.statusText}`
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        throw error;
      }
    )
    .then((response) => response.json())
    .then((rewards) => {
      console.log("Reward Deleted", rewards);
      dispatch(addRewards(rewards));
    })
    .catch((error) => dispatch(rewardsFailed(error.message)));
};

export const rewardsLoading = () => ({
  type: ActionTypes.REWARDS_LOADING,
});
export const rewardsFailed = (errMess) => ({
  type: ActionTypes.REWARDS_FAILED,
  payload: errMess,
});
export const addRewards = (rewards) => ({
  type: ActionTypes.ADD_REWARDS,
  payload: rewards,
});
export const addReward = (reward) => ({
  type: ActionTypes.ADD_REWARD,
  payload: reward,
});
export const editReward = (reward) => ({
  type: ActionTypes.EDIT_REWARD,
  payload: reward,
});

export const deleteRewardsQ = (id) => ({
  type: ActionTypes.DELETE_REWARDSQ,
  payload: id,
});
export const addRewardsQ = (reward) => ({
  type: ActionTypes.ADD_REWARDSQ,
  payload: reward,
});
export const approveRewardsQ = (id) => ({
  type: ActionTypes.APPROVE_REWARDSQ,
  payload: id,
});

export const addPoints = (points) => ({
  type: ActionTypes.ADD_POINTS,
  payload: points,
});
export const editSetting = () => ({
  type: ActionTypes.EDIT_SETTING,
});

export const resetSettings = () => ({
  type: ActionTypes.RESET_SETTINGS,
});
export const resetChores = () => ({
  type: ActionTypes.RESET_CHORES,
});
export const resetBehaviors = () => ({
  type: ActionTypes.RESET_BEHAVIORS,
});
export const resetRewards = () => ({
  type: ActionTypes.RESET_REWARDS,
});
export const resetBehaviorQ = () => ({
  type: ActionTypes.RESET_BEHAVIORQ,
});
export const resetRewardsQ = () => ({
  type: ActionTypes.RESET_REWARDSQ,
});

export const requestLogin = (creds) => {
  return {
    type: ActionTypes.LOGIN_REQUEST,
    creds,
  };
};

export const receiveLogin = (response) => {
  return {
    type: ActionTypes.LOGIN_SUCCESS,
    payload: response,
  };
};

export const loginError = (message) => {
  return {
    type: ActionTypes.LOGIN_FAILURE,
    message,
  };
};

export const loginUser = (creds) => (dispatch) => {
  // We dispatch requestLogin to kickoff the call to the API
  dispatch(requestLogin(creds));
  console.log("Logging in");
  return fetch(baseUrl + "users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(creds),
  })
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          const error = new Error(
            `Error ${response.status}: ${response.statusText}`
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        throw error;
      }
    )
    .then((response) => response.json())
    .then((response) => {
      if (response.success) {
        // If login was successful, set the token in local storage
        //localStorage.setItem("token", response.token);
        //localStorage.setItem("creds", JSON.stringify(creds));
        // Dispatch the success action
        //dispatch(fetchFavorites());
        console.log("Login Successful:", response);
        dispatch(receiveLogin(response));
      } else {
        const error = new Error("Error " + response.status);
        error.response = response;
        throw error;
      }
    })
    .catch((error) => dispatch(loginError(error.message)));
};

export const requestLogout = () => {
  return {
    type: ActionTypes.LOGOUT_REQUEST,
  };
};

export const receiveLogout = () => {
  return {
    type: ActionTypes.LOGOUT_SUCCESS,
  };
};

// Logs the user out
export const logoutUser = () => (dispatch) => {
  dispatch(requestLogout());
  //localStorage.removeItem("token");
  //localStorage.removeItem("creds");
  //dispatch(favoritesFailed("Error 401: Unauthorized"));
  dispatch(receiveLogout());
};

export const familyLoading = () => ({
  type: ActionTypes.FAMILY_LOADING,
});

export const familyFailed = (errMess) => ({
  type: ActionTypes.FAMILY_FAILED,
  payload: errMess,
});
export const addFamily = (family) => ({
  type: ActionTypes.ADD_FAMILY,
  payload: family,
});
export const setActiveChild = (childId) => ({
  type: ActionTypes.SET_ACTIVE_CHILD,
  payload: childId,
});

export const fetchFamily = () => (dispatch) => {
  dispatch(familyLoading());

  const state = store.getState();
  console.log("CurrentAuthStore:", state.Auth.userId);
  const authToken = state.Auth.token;
  console.log("authToken:", authToken);

  console.log("Fetching Family using: ", baseUrl + "family");
  return fetch(baseUrl + "users/family", {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  })
    .then(
      (response) => {
        //console.log("Fetch Response: ", response);
        if (response.ok) {
          return response;
        } else {
          //console.log("Fetch Error 1: ", response);
          const error = new Error(
            `Error ${response.status}: ${response.statusText}`
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        //console.log("Fetch Error 2: ", error);
        //console.log(error);
        const errMess = new Error(error.message);
        throw errMess;
      }
    )
    .then((response) => {
      //console.log("fetchFamily resp:", response);
      return response.json();
    })
    .then((family) => {
      //console.log("fetchFamily dispatch:", family);
      dispatch(addFamily(family));
    })
    .catch((error) => {
      console.log("Family Fetch Catch Error: ", error);
      dispatch(familyFailed(error.message));
    });
};
