import axios from 'axios';
import { getApiUrl } from 'api';
import _ from 'lodash';
import { createActions, handleActions } from 'redux-actions';

export const types = {
  FETCH_TRAINEE_ASSESS_REQUEST: 'ASSESSMENT/FETCH_TRAINEE_ASSESS_REQUEST',
  FETCH_TRAINEE_ASSESS_SUCCESS: 'ASSESSMENT/FETCH_TRAINEE_ASSESS_SUCCESS',
  FETCH_TRAINEE_ASSESS_FAILURE: 'ASSESSMENT/FETCH_TRAINEE_ASSESS_FAILURE',
  SAVING_TRAINEE_ASSESS: 'ASSESSMENT/SAVING_TRAINEE_ASSESS',
  SAVE_TRAINEE_ASSESS_SUCCESS: 'ASSESSMENT/SAVE_TRAINEE_ASSESS_SUCCESS',
  SAVE_TRAINEE_ASSESS_FAILURE: 'ASSESSMENT/SAVE_TRAINEE_ASSESS_FAILURE',
};
export const initialState = {};
export default handleActions(
  {
    [types.FETCH_TRAINEE_ASSESS_REQUEST]: (state, action) => ({
      ...state,
      loading_trainAssess: true,
    }),
    [types.FETCH_TRAINEE_ASSESS_SUCCESS]: (state, action) => ({
      ...state,
      loading_trainAssess: false,
      assessData: action.payload.data,
    }),
    [types.FETCH_TRAINEE_ASSESS_FAILURE]: (state, action) => ({
      ...state,
      loading_trainAssess: false,
      error: action.payload.error,
    }),
    [types.SAVING_TRAINEE_ASSESS]: (state, action) => ({
      ...state,
      saving: true,
    }),
    [types.SAVE_TRAINEE_ASSESS_SUCCESS]: (state, action) => ({
      ...state,
      success: action.payload.success,
      saving: false,
    }),
    [types.SAVE_TRAINEE_ASSESS_FAILURE]: (state, action) => ({
      ...state,
      success: action.payload.success,
      error: action.payload.error,
      saving: false,
    }),
  },
  initialState
);
export const { assessment: traineeAssessAction } = createActions({
  [types.FETCH_TRAINEE_ASSESS_REQUEST]: undefined,
  [types.FETCH_TRAINEE_ASSESS_SUCCESS]: data => ({
    data,
  }),
  [types.FETCH_TRAINEE_ASSESS_FAILURE]: error => ({
    error,
  }),
  [types.SAVING_TRAINEE_ASSESS]: undefined,
  [types.SAVE_TRAINEE_ASSESS_SUCCESS]: data => ({
    success: true,
    data,
  }),
  [types.SAVE_TRAINEE_ASSESS_FAILURE]: error => ({
    success: false,
    error,
  }),
});

/**
 * 获取学员职业能力检核结果
 * @param traineeId
 * @return {function(*, *)}
 */
export const loadTraineeAssess = traineeId => (dispatch, getState) => {
  dispatch(traineeAssessAction.fetchTraineeAssessRequest());
  axios
    .get(getApiUrl(`trainees/${traineeId}/assess`), {
      params: { traineeId: traineeId },
    })
    .then(response => {
      const result = response.data;
      const data = result.data || {};
      data.assessResult = _.reduce(
        data.assessResult || [],
        (result, item) => {
          result[item.abilityId] = item.assessOption;
          return result;
        },
        {}
      );
      dispatch(traineeAssessAction.fetchTraineeAssessSuccess(data));
    })
    .catch(function(err) {
      dispatch(traineeAssessAction.fetchTraineeAssessFailure(err.message));
    });
};

export const saveAssessItem = (traineeId, abilityId, option, callback) => (dispatch, getState) => {
  dispatch(traineeAssessAction.savingTraineeAssess());
  axios
    .put(getApiUrl(`trainees/${traineeId}/access`), { abilityId: abilityId, option: option })
    .then(response => {
      const result = response.data;
      dispatch(traineeAssessAction.saveTraineeAssessSuccess(result.data));
      callback(true);
    })
    .catch(function(err) {
      dispatch(traineeAssessAction.saveTraineeAssessFailure(err.message));
      callback(false, err.message);
    });
};

export const handleAssessData = (assessData, state) => {
  const { abilities } = state.ability || {};
  const abilityCount = Object.keys(abilities).length;
  assessData = assessData || {};
  assessData.progress =
    abilityCount === 0 ? 'N/A' : `${assessData.assessCount || 0} / ${abilityCount}`;
  assessData.percent =
    abilityCount === 0 ? 'N/A' : (assessData.assessCount / abilityCount * 100).toFixed(1);
  return assessData;
};
