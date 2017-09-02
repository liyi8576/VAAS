import axios from 'axios';
import { getApiUrl } from 'api';
import { createActions, handleActions } from 'redux-actions';

export const types = {
  FETCH_OCCUPATION_REQUEST: 'OCCUPATION/FETCH_OCCUPATION_REQUEST',
  FETCH_OCCUPATION_SUCCESS: 'OCCUPATION/FETCH_OCCUPATION_SUCCESS',
  FETCH_OCCUPATION_FAILURE: 'OCCUPATION/FETCH_OCCUPATION_FAILURE',

  RESET_occupation_STATE: 'OCCUPATION/RESET_occupation_STATE',

  HANDLE_occupation_SUCCESS: 'OCCUPATION/HANDLE_occupation_SUCCESS',
  HANDLE_occupation_FAILURE: 'OCCUPATION/HANDLE_occupation_FAILURE',

  RESET_HANDLE_STATUS: 'OCCUPATION/RESET_HANDLE_STATUS',
};

export const initialState = {
  isLoading: false,
  occupationInfo: {},
  error: null,
  operate: null,
};

export default handleActions(
  {
    [types.FETCH_OCCUPATION_REQUEST]: (state, action) => ({
      ...state,
      isLoading: true,
    }),
    [types.FETCH_OCCUPATION_SUCCESS]: (state, action) => ({
      ...state,
      isLoading: false,
      occupationInfo: action.payload.data,
    }),
    [types.FETCH_OCCUPATION_FAILURE]: (state, action) => ({
      ...state,
      isLoading: false,
      error: action.payload.error,
    }),
    [types.RESET_occupation_STATE]: (state, action) => ({
      ...state,
      occupationInfo: {},
    }),
    [types.HANDLE_occupation_SUCCESS]: (state, action) => ({
      ...state,
      operate: action.payload.operate,
      occupationInfo: action.payload.data,
    }),
    [types.HANDLE_occupation_FAILURE]: (state, action) => ({
      ...state,
      operate: action.payload.operate,
      error: action.payload.error,
    }),
    [types.RESET_HANDLE_STATUS]: (state, action) => ({
      ...state,
      operate: {},
    }),
  },
  initialState,
);

export const { occupation: occupationActions } = createActions({
  [types.FETCH_OCCUPATION_REQUEST]: () => undefined,
  [types.FETCH_OCCUPATION_SUCCESS]: data => ({ data }),
  [types.FETCH_OCCUPATION_FAILURE]: error => ({ error }),

  [types.RESET_occupation_STATE]: undefined,

  [types.HANDLE_occupation_SUCCESS]: (type, resName, data) => ({
    operate: { type, success: true, resName },
    data,
  }),
  [types.HANDLE_occupation_FAILURE]: (type, resName, error) => ({
    operate: { type, success: false, resName, error },
    error,
  }),
  [types.RESET_HANDLE_STATUS]: undefined,
});

export const loadOccupation = occupationId => dispatch => {
  dispatch(occupationActions.fetchOccupationRequest());
  axios
    .get(getApiUrl(`occupations/${occupationId}`))
    .then(response => {
      const result = response.data;
      dispatch(occupationActions.fetchOccupationSuccess(result.data));
    })
    .catch(function(err) {
      dispatch(occupationActions.fetchOccupationFailure(err.message));
    });
};

export const createOccupation = occupation => dispatch => {
  axios
    .post(getApiUrl(`occupations`), { occupation })
    .then(response => {
      const result = response.data;
      dispatch(
        occupationActions.handleOccupationSuccess(
          'CREATE',
          occupation.name,
          result.data,
        ),
      );
    })
    .catch(function(err) {
      dispatch(
        occupationActions.handleOccupationFailure(
          'CREATE',
          occupation.name,
          err.message,
        ),
      );
    });
};

export const modifyOccupation = (occupationId, occupation) => dispatch => {
  axios
    .put(getApiUrl(`occupations/${occupationId}`), { occupation })
    .then(response => {
      const result = response.data;
      dispatch(
        occupationActions.handleOccupationSuccess(
          'MODIFY',
          occupation.name,
          result.data,
        ),
      );
    })
    .catch(function(err) {
      dispatch(
        occupationActions.handleOccupationFailure(
          'MODIFY',
          occupation.name,
          err.message,
        ),
      );
    });
};

export const deleteOccupation = (occupationId, occupationName) => dispatch => {
  axios
    .delete(getApiUrl(`occupations/${occupationId}`))
    .then(response => {
      const result = response.data;
      dispatch(
        occupationActions.handleOccupationSuccess('DELETE', occupationName, result.data),
      );
    })
    .catch(function(err) {
      dispatch(occupationActions.handleOccupationFailure('DELETE', err.message));
    });
};
