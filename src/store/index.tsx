import { compose, applyMiddleware, createStore } from "redux";
import reducers from "./reducers";
import ReduxThunk from "redux-thunk";

export const Store = createStore(
    reducers,
    {},
    compose(applyMiddleware(ReduxThunk))
);
