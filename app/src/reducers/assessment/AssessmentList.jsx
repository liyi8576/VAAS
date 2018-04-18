import axios from 'axios';
import { getApiUrl } from 'api';
import _ from 'lodash';
import { createActions, handleActions } from 'redux-actions';

export const types = {
  FETCH_ASSESSMENTS_REQUEST: 'ASSESSMENT/FETCH_ASSESSMENTS_REQUEST',
  FETCH_ASSESSMENTS_SUCCESS: 'ASSESSMENT/FETCH_ASSESSMENTS_SUCCESS',
  FETCH_ASSESSMENTS_FAILURE: 'ASSESSMENT/FETCH_ASSESSMENTS_FAILURE',
  RESET_ASSESSMENT_LIST: 'ASSESSMENT/RESET_ASSESSMENT_LIST',
};
export const initialState = {};
export default handleActions(
  {
    [types.FETCH_ASSESSMENTS_REQUEST]: (state, action) => ({
      ...state,
      isLoading: true,
    }),
    [types.FETCH_ASSESSMENTS_SUCCESS]: (state, action) => ({
      ...state,
      isLoading: false,
      assessmentList: action.payload.data,
      assessmentCount: action.payload.total,
    }),
    [types.FETCH_ASSESSMENTS_FAILURE]: (state, action) => ({
      ...state,
      isLoading: false,
      error: action.payload.error,
    }),
    [types.RESET_ASSESSMENT_LIST]: state => ({
      ...state,
      assessmentList: [],
    }),
  },
  initialState,
);
export const { assessment: assessmentListAction } = createActions({
  [types.FETCH_ASSESSMENTS_REQUEST]: undefined,
  [types.FETCH_ASSESSMENTS_SUCCESS]: (data, total) => ({
    data,
    total,
  }),
  [types.FETCH_ASSESSMENTS_FAILURE]: message => ({
    message,
  }),
  [types.RESET_ASSESSMENT_LIST]: undefined,
});

export const loadAssessments = queryParam => (dispatch, getState) => {
  dispatch(assessmentListAction.fetchAssessmentsRequest());
  axios
    .get(getApiUrl('trainees/assessResult'), {
      params: queryParam,
    })
    .then(response => {
      const result = response.data;
      dispatch(
        assessmentListAction.fetchAssessmentsSuccess(
          result.data.list,
          result.data.total,
        ),
      );
    })
    .catch(function(err) {
      dispatch(assessmentListAction.fetchAssessmentsFailure(err.message));
    });
};

export const dealAssessmentList = state => {
  let { abilities } = state.ability || {};
  const count = Object.keys(abilities).length;
  const { assessmentList } = state.assessment || {};
  const resultList = assessmentList && assessmentList.assessmentList;
  if (count > 0) {
    return (resultList || []).map(item => {
      return {
        ...item,
        assessPercent: (item.assessCount / count * 100).toFixed(2),
      };
    });
  }
  return resultList || [];
};
