import { combineReducers } from 'redux';
import occupationList from './OccupationList';
import occupationInfo from './OccupationInfo';
import recommandList from './RecommandList';

export default combineReducers({
  occupationList,
  occupationInfo,
  recommandList,
});
