import { combineReducers } from 'redux';
import loginReducer from './loginReducer';
import studentReducer from './studentReducer';
import jobReducer from './jobReducer';

const rootReducer =  combineReducers({
  login: loginReducer,
  student : studentReducer,
  job : jobReducer
});

export default rootReducer;