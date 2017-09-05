import { combineReducers } from 'redux';
import assessmentList from './AssessmentList';
import traineeAssess from './TraineeAssess';

export default combineReducers({
  assessmentList,
  traineeAssess,
});
