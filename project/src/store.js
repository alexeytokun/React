import { createStore, combineReducers, applyMiddleware } from 'redux';
import user from './reducers/userReducer';
import lots from './reducers/lotsReducer';
import thunk from 'redux-thunk';

const store = createStore(combineReducers({user, lots}), {}, applyMiddleware(thunk));
export default store;