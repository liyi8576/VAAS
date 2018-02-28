import axios from 'axios';
import { getApiUrl } from 'api';
import { createActions, handleActions } from 'redux-actions';

export const types = {
  FETCH_TRAINEE_REQUEST: 'TRAINEE/FETCH_TRAINEE_REQUEST',
  FETCH_TRAINEE_SUCCESS: 'TRAINEE/FETCH_TRAINEE_SUCCESS',
  FETCH_TRAINEE_FAILURE: 'TRAINEE/FETCH_TRAINEE_FAILURE',

  RESET_TRAINEE_STATE: 'TRAINEE/RESET_TRAINEE_STATE',

  HANDLE_TRAINEE_SUCCESS: 'TRAINEE/HANDLE_TRAINEE_SUCCESS',
  HANDLE_TRAINEE_FAILURE: 'TRAINEE/HANDLE_TRAINEE_FAILURE',

  RESET_HANDLE_STATUS: 'TRAINEE/RESET_HANDLE_STATUS',
};

export const initialState = {
  isLoading: false,
  traineeInfo: {},
  error: null,
  operate: null,
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
    [types.RESET_TRAINEE_STATE]: (state, action) => ({
      ...state,
      traineeInfo: {},
    }),
    [types.HANDLE_TRAINEE_SUCCESS]: (state, action) => ({
      ...state,
      operate: action.payload.operate,
      traineeInfo: action.payload.data,
    }),
    [types.HANDLE_TRAINEE_FAILURE]: (state, action) => ({
      ...state,
      operate: action.payload.operate,
      error: action.payload.error,
    }),
    [types.RESET_HANDLE_STATUS]: (state, action) => ({
      ...state,
      operate: {},
    }),
  },
  initialState
);

export const { trainee: traineeActions } = createActions({
  [types.FETCH_TRAINEE_REQUEST]: () => undefined,
  [types.FETCH_TRAINEE_SUCCESS]: data => ({ data }),
  [types.FETCH_TRAINEE_FAILURE]: error => ({ error }),

  [types.RESET_TRAINEE_STATE]: undefined,

  [types.HANDLE_TRAINEE_SUCCESS]: (type, resName, data) => ({
    operate: { type, success: true, resName },
    data,
  }),
  [types.HANDLE_TRAINEE_FAILURE]: (type, resName, error) => ({
    operate: { type, success: false, resName, error },
    error,
  }),
  [types.RESET_HANDLE_STATUS]: undefined,
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

export const createTrainee = trainee => dispatch => {
  axios
    .post(getApiUrl(`trainees`), trainee)
    .then(response => {
      const result = response.data;
      dispatch(traineeActions.handleTraineeSuccess('CREATE', trainee.name, result.data));
    })
    .catch(function(err) {
      dispatch(traineeActions.handleTraineeFailure('CREATE', trainee.name, err.message));
    });
};

export const modifyTrainee = (traineeId, trainee) => dispatch => {
  axios
    .put(getApiUrl(`trainees/${traineeId}`), trainee)
    .then(response => {
      const result = response.data;
      dispatch(traineeActions.handleTraineeSuccess('MODIFY', trainee.name, result.data));
    })
    .catch(function(err) {
      dispatch(traineeActions.handleTraineeFailure('MODIFY', trainee.name, err.message));
    });
};

export const deleteTrainee = (traineeId, traineeName) => dispatch => {
  axios
    .delete(getApiUrl(`trainees/${traineeId}`))
    .then(response => {
      const result = response.data;
      dispatch(traineeActions.handleTraineeSuccess('DELETE', traineeName, result.data));
    })
    .catch(function(err) {
      dispatch(traineeActions.handleTraineeFailure('DELETE', err.message));
    });
};
