import { createStore, combineReducers, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import listingReducer from "./reducers/listingReducer";
import userReducer from "./reducers/userReducer";

const rootReducer = combineReducers({
    listings: listingReducer,
    user: userReducer
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;