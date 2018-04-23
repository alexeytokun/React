import { createStore, combineReducers, applyMiddleware } from 'redux';
import user from './reducers/userReducer';
import location from './reducers/locationReducer';
import thunk from 'redux-thunk';

const store = createStore(combineReducers({user, location}), {}, applyMiddleware(thunk));
export default store;