import { combineReducers } from 'redux';
import occupationList from './OccupationList';
import occupationInfo from './OccupationInfo';

export default combineReducers({
  occupationList,
  occupationInfo,
});
