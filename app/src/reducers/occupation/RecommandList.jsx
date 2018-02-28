import axios from 'axios';
import { getApiUrl } from 'api';
import { createActions, handleActions } from 'redux-actions';

export const types = {
  FETCH_RECOMMAND_LIST_REQUEST: 'OCCUPATION/FETCH_RECOMMAND_REQUEST',
  FETCH_RECOMMAND_LIST_SUCCESS: 'OCCUPATION/FETCH_RECOMMAND_SUCCESS',
  FETCH_RECOMMAND_LIST_FAILURE: 'OCCUPATION/FETCH_RECOMMAND_FAILURE',
};

export const initialState = {
  isLoading: false,
  list: [],
  count: 0,
  error: null,
};

export default handleActions(
  {
    [types.FETCH_RECOMMAND_LIST_REQUEST]: (state, action) => ({
      ...state,
      isLoading: true,
    }),
    [types.FETCH_RECOMMAND_LIST_SUCCESS]: (state, action) => {
      return {
        ...state,
        isLoading: false,
        list: action.payload.data,
        count: action.payload.total,
      };
    },
    [types.FETCH_RECOMMAND_LIST_FAILURE]: (state, action) => ({
      ...state,
      isLoading: false,
      error: action.payload.error,
    }),
  },
  initialState
);

export const { occupation: recommandListActions } = createActions({
  [types.FETCH_RECOMMAND_LIST_REQUEST]: undefined,
  [types.FETCH_RECOMMAND_LIST_SUCCESS]: (data, total) => ({
    data,
    total,
  }),
  [types.FETCH_RECOMMAND_LIST_FAILURE]: message => ({
    message,
  }),
});

export const loadRecommandList = (occupationId, queryParam) => dispatch => {
  dispatch(recommandListActions.fetchRecommandRequest());
  axios
    .get(getApiUrl(`occupations/${occupationId}/recommand`), {
      params: queryParam,
    })
    .then(response => {
      const result = response.data;
      dispatch(recommandListActions.fetchRecommandSuccess(result.data.list, result.data.total));
    })
    .catch(function(err) {
      dispatch(recommandListActions.fetchRecommandFailure(err.message));
    });
};
