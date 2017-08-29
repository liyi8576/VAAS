import axios from 'axios';
import { getApiUrl } from 'api';
import { createActions, handleActions } from 'redux-actions';

export const types = {
  FETCH_TRAINEE_LIST_REQUEST: 'TRAINEE/FETCH_TRAINEE_LIST_REQUEST',
  FETCH_TRAINEE_LIST_SUCCESS: 'TRAINEE/FETCH_TRAINEE_LIST_SUCCESS',
  FETCH_TRAINEE_LIST_FAILURE: 'TRAINEE/FETCH_TRAINEE_LIST_FAILURE',
  RESET_TRAINEE_LIST: 'TRAINEE/RESET_TRAINEE_LIST',
};

export const initialState = {
  isLoading: false,
  traineeList: [],
  traineeCount: 0,
};

export default handleActions(
  {
    [types.FETCH_TRAINEE_LIST_REQUEST]: (state, action) => ({
      ...state,
      isLoading: true,
    }),
    [types.FETCH_TRAINEE_LIST_SUCCESS]: (state, action) => {
      return {
        ...state,
        isLoading: false,
        traineeList: action.payload.data,
        traineeCount: action.payload.total,
      };
    },
    [types.FETCH_TRAINEE_LIST_FAILURE]: (state, action) => ({
      ...state,
      isLoading: false,
      error: action.payload.error,
    }),
    [types.RESET_TRAINEE_LIST]: state => ({
      ...state,
      traineeList: [],
    }),
  },
  initialState,
);

export const { trainee: traineeListActions } = createActions({
  [types.FETCH_TRAINEE_LIST_REQUEST]: undefined,
  [types.FETCH_TRAINEE_LIST_SUCCESS]: (data, total) => ({
    data,
    total,
  }),
  [types.FETCH_TRAINEE_LIST_FAILURE]: message => ({
    message,
  }),
  [types.RESET_TRAINEE_LIST]: undefined,
});

export const loadTrainees = queryParam => dispatch => {
  dispatch(traineeListActions.fetchTraineeListRequest());
  axios
    .get(getApiUrl('trainees'), {
      params: queryParam,
    })
    .then(response => {
      const result = response.data;
      dispatch(
        traineeListActions.fetchTraineeListSuccess(
          result.data.list,
          result.data.total,
        ),
      );
    })
    .catch(function(err) {
      dispatch(traineeListActions.fetchTraineeListFailure(err.message));
    });
};
