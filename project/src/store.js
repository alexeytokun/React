import { createStore, combineReducers, applyMiddleware } from 'redux';
import user from './reducers/userReducer';
import thunk from 'redux-thunk';

const store = createStore(combineReducers({user}), {}, applyMiddleware(thunk));
export default store;