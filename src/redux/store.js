import { createStore, applyMiddleware, combineReducers } from "redux";
import { thunk } from "redux-thunk";
import { composeWithDevTools } from "@redux-devtools/extension";
import { loadJobReducer, loadJobSingleReducer } from "./reducers/jobReducer";
import { loadJobTypeReducer } from "./reducers/jobTypeReducer";
import {
  userApplyJobReducer,
  userReducerLogout,
  userReducerProfile,
  userReducerSignIn,
} from "./reducers/userReducer";

const reducer = combineReducers({
  loadJobs: loadJobReducer,
  jobType: loadJobTypeReducer,
  signIn: userReducerSignIn,
  logOut: userReducerLogout,
  userReducerProfile: userReducerProfile,
  SingleJob: loadJobSingleReducer,
  userJobApplication: userApplyJobReducer,
});

//initial state
let initialState = {
  signIn: {
    userInfo: localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null,
  },
};
const middleware = [thunk];
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
