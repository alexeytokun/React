import user from './userReducer';
import lots from './lotsReducer';
import errors from './errorsReducer';
import { combineReducers } from "redux";

const rootReducer = combineReducers({user, lots, errors});
export default rootReducer;