import axios from 'axios';
import { getApiUrl } from 'api';
import { createActions, handleActions } from 'redux-actions';

export const types = {
  FETCH_OCCUPATION_LIST_REQUEST: 'OCCUPATION/FETCH_OCCUPATION_LIST_REQUEST',
  FETCH_OCCUPATION_LIST_SUCCESS: 'OCCUPATION/FETCH_OCCUPATION_LIST_SUCCESS',
  FETCH_OCCUPATION_LIST_FAILURE: 'OCCUPATION/FETCH_OCCUPATION_LIST_FAILURE',
  RESET_OCCUPATION_LIST: 'OCCUPATION/RESET_OCCUPATION_LIST',
};

export const initialState = {
  isLoading: false,
  occupationList: [],
  occupationCount: 0,
  error: null,
};

export default handleActions(
  {
    [types.FETCH_OCCUPATION_LIST_REQUEST]: (state, action) => ({
      ...state,
      isLoading: true,
    }),
    [types.FETCH_OCCUPATION_LIST_SUCCESS]: (state, action) => {
      return {
        ...state,
        isLoading: false,
        occupationList: action.payload.data,
        occupationCount: action.payload.total,
      };
    },
    [types.FETCH_OCCUPATION_LIST_FAILURE]: (state, action) => ({
      ...state,
      isLoading: false,
      error: action.payload.error,
    }),
    [types.RESET_OCCUPATION_LIST]: state => ({
      ...state,
      occupationList: [],
    }),
  },
  initialState,
);

export const { occupation: occupationListActions } = createActions({
  [types.FETCH_OCCUPATION_LIST_REQUEST]: undefined,
  [types.FETCH_OCCUPATION_LIST_SUCCESS]: (data, total) => ({
    data,
    total,
  }),
  [types.FETCH_OCCUPATION_LIST_FAILURE]: message => ({
    message,
  }),
  [types.RESET_OCCUPATION_LIST]: undefined,
});

export const loadOccupations = queryParam => dispatch => {
  dispatch(occupationListActions.fetchOccupationListRequest());
  axios
    .get(getApiUrl('occupations'), {
      params: queryParam,
    })
    .then(response => {
      const result = response.data;
      dispatch(
        occupationListActions.fetchOccupationListSuccess(
          result.data.list,
          result.data.total,
        ),
      );
    })
    .catch(function(err) {
      dispatch(occupationListActions.fetchOccupationListFailure(err.message));
    });
};
