import axios from 'axios';
import { getApiUrl } from 'api';
import { createActions, handleActions } from 'redux-actions';

export const types = {
  FETCH_TRAINEE_REQUEST: 'TRAINEE/FETCH_TRAINEE_REQUEST',
  FETCH_TRAINEE_SUCCESS: 'TRAINEE/FETCH_TRAINEE_SUCCESS',
  FETCH_TRAINEE_FAILURE: 'TRAINEE/FETCH_TRAINEE_FAILURE',
};

export const initialState = {
  isLoading: false,
  traineeInfo: {},
};

export default handleActions(
  {
    [types.FETCH_TRAINEE_REQUEST]: (state, action) => ({
      ...state,
      isLoading: true,
    }),
    [types.FETCH_TRAINEE_SUCCESS]: (state, action) => ({
      ...state,
      isLoading: false,
      traineeInfo: action.payload.data,
    }),
    [types.FETCH_TRAINEE_FAILURE]: (state, action) => ({
      ...state,
      isLoading: false,
      error: action.payload.error,
    }),
  },
  initialState,
);

export const { trainee: traineeActions } = createActions({
  [types.FETCH_TRAINEE_REQUEST]: () => undefined,
  [types.FETCH_TRAINEE_SUCCESS]: data => ({
    data,
  }),
  [types.FETCH_TRAINEE_FAILURE]: message => ({
    message,
  }),
});

export const loadTrainee = traineeId => dispatch => {
  dispatch(traineeActions.fetchTraineeRequest());
  axios
    .get(getApiUrl(`trainees/${traineeId}`))
    .then(response => {
      const result = response.data;
      dispatch(traineeActions.fetchTraineeSuccess(result.data));
    })
    .catch(function(err) {
      dispatch(traineeActions.fetchTraineeFailure(err.message));
    });
};
