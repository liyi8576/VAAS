import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import trainee from './trainee';

export default combineReducers({
  routing,
  trainee,
});
