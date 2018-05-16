import user from './userReducer';
import lots from './lotsReducer';
import { combineReducers } from "redux";

const rootReducer = combineReducers({user, lots});
export default rootReducer;