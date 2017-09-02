import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import trainee from './trainee';
import occupation from './occupation';
import ability from './ability/Ability';
import enumDic from './EnumDic';

export default combineReducers({
  routing,
  enumDic,
  trainee,
  occupation,
  ability,
});
