import { configureStore } from '@reduxjs/toolkit';
import { thunk } from 'redux-thunk';
import listingReducer from "./reducers/listingReducer";
import userReducer from "./reducers/userReducer";

export const store = configureStore({
    reducer: {
        listings: listingReducer,
        user: userReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
    devTools: process.env.NODE_ENV !== 'production',
});

