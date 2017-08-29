import { combineReducers } from 'redux';
import traineeList from './TraineeList';
import traineeInfo from './TraineeInfo';


export default combineReducers({
  traineeList,
  traineeInfo,
});
