import { combineReducers } from 'redux';
import layoutReducer from './layout';
import appInstanceReducer from './appInstance';
import contextReducer from './context';
import userReducer from './users';

export default combineReducers({
  layout: layoutReducer,
  appInstance: appInstanceReducer,
  context: contextReducer,
  user: userReducer,
});
