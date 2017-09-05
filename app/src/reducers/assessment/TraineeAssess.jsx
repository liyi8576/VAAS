import axios from 'axios';
import { getApiUrl } from 'api';
import _ from 'lodash';
import { createActions, handleActions } from 'redux-actions';

export const types = {
  FETCH_TRAINEE_ASSESS_REQUEST: 'ASSESSMENT/FETCH_TRAINEE_ASSESS_REQUEST',
  FETCH_TRAINEE_ASSESS_SUCCESS: 'ASSESSMENT/FETCH_TRAINEE_ASSESS_SUCCESS',
  FETCH_TRAINEE_ASSESS_FAILURE: 'ASSESSMENT/FETCH_TRAINEE_ASSESS_FAILURE',
};
export const initialState = {};
export default handleActions(
  {
    [types.FETCH_TRAINEE_ASSESS_REQUEST]: (state, action) => ({
      ...state,
      isLoading: true,
    }),
    [types.FETCH_TRAINEE_ASSESS_SUCCESS]: (state, action) => ({
      ...state,
      isLoading: false,
      traineeAssess: action.payload.data,
    }),
    [types.FETCH_TRAINEE_ASSESS_FAILURE]: (state, action) => ({
      ...state,
      isLoading: false,
      error: action.payload.error,
    }),
  },
  initialState,
);
export const { assessment: traineeAssessAction } = createActions({
  [types.FETCH_TRAINEE_ASSESS_REQUEST]: undefined,
  [types.FETCH_TRAINEE_ASSESS_SUCCESS]: (data) => ({
    data,
  }),
  [types.FETCH_TRAINEE_ASSESS_FAILURE]: message => ({
    message,
  }),
});

export const loadTraineeAssess = traineeId => (dispatch, getState) => {
  dispatch(traineeAssessAction.fetchTraineeAssessRequest());
  axios
    .get(getApiUrl(`assessments/${traineeId}`), {
      params: { traineeId: traineeId },
    })
    .then(response => {
      const result = response.data;
      dispatch(
        traineeAssessAction.fetchTraineeAssessSuccess(
          result.data,
        ),
      );
    })
    .catch(function(err) {
      dispatch(traineeAssessAction.fetchTraineeAssessFailure(err.message));
    });
};
