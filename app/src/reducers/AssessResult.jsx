import axios from 'axios';
import { getApiUrl } from 'api';
import _ from 'lodash';
import Constants from 'Constants';
import { createActions, handleActions } from 'redux-actions';
import { occupationListActions } from './occupation/OccupationList';

export const types = {
  FETCH_ASSESS_RESULT: 'ASSESS_RESULT/FETCH_ASSESS_RESULT',
  FETCH_CONSTRAST_RESULT: 'ASSESS_RESULT/FETCH_CONSTRAST_RESULT',
  RESET_CONSTRAST_RESULT: 'ASSESS_RESULT/RESET_CONSTRAST_RESULT',
};
export const initialState = {
  isLoading: false,
  assessResult: [],
  constrastResult: [],
  error: null,
};
//************** Reducer *********************
export default handleActions(
  {
    [types.FETCH_ASSESS_RESULT]: (state, action) => ({
      ...state,
      isLoading: action.payload.status === 'REQUEST',
      assessResult: action.payload.assessResult || [],
      error: action.payload.error || null,
    }),
    [types.FETCH_CONSTRAST_RESULT]: (state, action) => ({
      ...state,
      isLoading: action.payload.status === 'REQUEST',
      constrastResult: action.payload.constrastResult || [],
      error: action.payload.error || null,
    }),
    [types.RESET_CONSTRAST_RESULT]: (state, action) => ({
      ...state,
      constrastResult: [],
    }),
  },
  initialState
);

//************** Action Creator *********************
export const { assessResult: assessResultAction } = createActions({
  [types.FETCH_ASSESS_RESULT]: (status, assessResult, error) => ({
    status,
    assessResult,
    error,
  }),
  [types.FETCH_CONSTRAST_RESULT]: (status, constrastResult, error) => ({
    status,
    constrastResult,
    error,
  }),
  [types.RESET_CONSTRAST_RESULT]: undefined,
});

//************** Action *********************
export const loadAssessResult = traineeId => (dispatch, getState) => {
  dispatch(assessResultAction.fetchAssessResult('REQUEST'));
  axios
    .get(getApiUrl(`trainees/${traineeId}/assessResult`))
    .then(response => {
      const result = response.data;
      dispatch(assessResultAction.fetchAssessResult('SUCCESS', result.data || []));
    })
    .catch(function(err) {
      dispatch(assessResultAction.fetchAssessResult('FAILURE', err.message));
    });
};

export const loadConstrastResult = (occupationId, traineeId) => (dispatch, getState) => {
  dispatch(assessResultAction.fetchConstrastResult('REQUEST'));
  axios
    .get(getApiUrl(`trainees/${traineeId}/occupations/${occupationId}/constrast`))
    .then(response => {
      const result = response.data;
      dispatch(assessResultAction.fetchConstrastResult('SUCCESS', result.data || []));
    })
    .catch(function(err) {
      dispatch(assessResultAction.fetchConstrastResult('FAILURE', err.message));
    });
};

export const resetConstrastResult = () => dispatch => {
  dispatch(assessResultAction.resetConstrastResult());
};

//************** Selector *********************
export const calcLifeIndi = state => {
  const { assessResult } = state.assessResult || {};
  if (!_.isArray(assessResult)) return null;
  const scoreMap = { A: 1, B: 2, C: 3, D: 4 };
  return _.filter(assessResult, ['domain', Constants.DOMAIN_INDEPENDENT_LIFE]).reduce(
    (sum, result) => {
      const { assessOption } = result;
      return sum + (scoreMap[assessOption] || 0);
    },
    0
  );
};

export const converAssessResult = state => {
  const { assessResult } = state.assessResult || {};
  if (!_.isArray(assessResult)) return [];
  const sortData = _.orderBy(assessResult, ['domain', item => _.toNumber(item.id.substr(1))]);
  const resultAry = [];
  let domain = null,
    obj = {},
    index = 1;
  for (let i = 0; i < sortData.length; i++) {
    const item = sortData[i];
    if (domain !== null && domain !== item.domain) {
      resultAry.push(Object.assign({}, obj));
      obj = {};
      index = 1;
    }
    domain = item.domain;
    Object.assign(obj, {
      domain,
      [`id_${index}`]: item.id,
      [`name_${index}`]: item.name,
      [`assessOption_${index}`]: item.assessOption,
    });
    if (index % 4 === 0) {
      resultAry.push(Object.assign({}, obj));
      index = 0;
      obj = {};
    }
    index++;
  }
  return resultAry;
};

export const converConstrastResult = state => {
  const { abilities } = state.ability || {};
  const { constrastResult } = state.assessResult || [];
  const domainMap = {};
  const resultAry = [];
  const domains = Object.keys(Constants.DOMAIN_CONFIG);
  let maxAry = 0;
  _.each(constrastResult, item => {
    const key = `${item.necessaryLevel === 1 ? 'N' : 'S'}_${item.domain}`;
    const ary = domainMap[key] || [];
    const ability = abilities && abilities[item.abilityId];
    ary.push({
      abilityId: item.abilityId,
      abilityName: ability && ability.name,
      result: constrastRule(item.criterionScore, item.assessOption),
      criterion: item.criterionScore,
      assess: item.assessOption,
    });
    domainMap[key] = ary;
    maxAry = ary.length > maxAry ? ary.length : maxAry;
  });
  for (let i = 0; i < maxAry; i++) {
    const row = {};
    _.each(domains, domainId => {
      row[`necessary_${domainId}`] = domainMap[`N_${domainId}`][i];
      row[`secondary_${domainId}`] = domainMap[`S_${domainId}`][i];
    });
    resultAry.push(row);
  }
  return resultAry;
};

function constrastRule(criterionScore, assessScore) {
  let result = null;
  if (_.isUndefined(criterionScore) || _.isUndefined(assessScore)) result = null;
  if (assessScore > criterionScore) result = 1;
  if (assessScore === criterionScore) result = 0;
  if (assessScore < criterionScore) result = -1;
  return result;
}
