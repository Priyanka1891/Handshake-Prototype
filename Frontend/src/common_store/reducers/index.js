import { combineReducers } from 'redux';
import loginReducer from './loginReducer';
import studentReducer from './studentReducer';
import jobReducer from './jobReducer';
import eventReducer from './eventReducer';
import messageReducer from './messageReducer';

const rootReducer =  combineReducers({
  login: loginReducer,
  student : studentReducer,
  job : jobReducer,
  event : eventReducer,
  msg : messageReducer
});

export default rootReducer;