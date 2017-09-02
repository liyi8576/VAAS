import axios from 'axios';
import { getApiUrl } from 'api';
import _ from 'lodash';
import { createActions, handleActions } from 'redux-actions';

export const types = {
  FETCH_ABILITIES_SUCCESS: 'ABILITY/FETCH_ABILITIES_SUCCESS',
  FETCH_ABILITIES_FAILURE: 'ABILITY/FETCH_ABILITIES_FAILURE',

  GET_ABILITIES_CONFIG: 'ABILITY/GET_ABILITIES_CONFIG',
};
export const initialState = {
  domain: {},
  abilities: {},
  config: {},
  error: '',
};
export default handleActions(
  {
    [types.FETCH_ABILITIES_SUCCESS]: (state, action) => ({
      ...state,
      domain: action.payload.domain,
      abilities: action.payload.abilities,
    }),
    [types.FETCH_ABILITIES_FAILURE]: (state, action) => ({
      ...state,
      error: action.payload,
    }),
    [types.GET_ABILITIES_CONFIG]: (state, action) => ({
      ...state,
      config: action.payload,
    }),
  },
  initialState,
);
export const { ability: abilityActions } = createActions({
  [types.FETCH_ABILITIES_SUCCESS]: (domain, abilities) => ({
    domain,
    abilities,
  }),
  [types.FETCH_ABILITIES_FAILURE]: error => error,
  [types.GET_ABILITIES_CONFIG]: config => getAbilitiesConfig(),
});

const getAbilitiesConfig = () => [
  {
    name: '需自行处理交通',
    id: 'traffic',
    necessaryAbility: ['C22'],
  },
  {
    name: '需自行处理吃饭',
    id: 'eat',
    necessaryAbility: ['C1', 'C16', 'C17', 'C18'],
  },
  {
    name: '需自行处理住宿',
    id: 'lodge',
    necessaryAbility: ['C2', 'C3', 'C11', 'C16', 'C17', 'C18', 'C29'],
  },
];
const domainConfig = {
  '101': { name: '工作人格', icon: 'heart-o' },
  '102': { name: '职业能力', icon: 'tool' },
  '103': { name: '社区独立能力', icon: 'team' },
};
export const loadAbilities = () => (dispatch, getState) => {
  axios
    .get(getApiUrl(`abilities`))
    .then(response => {
      const result = response.data;
      const domains = _.groupBy(result.data || [], 'domain') || {};
      const abilityDomains = _.reduce(
        domains,
        (obj, abilities, key) => {
          obj[key] = {
            id: key,
            ...domainConfig[key],
            abilities: _.map(abilities, 'id'),
          };
          return obj;
        },
        {},
      );
      const abilities = (result.data || []).reduce((obj, ability) => {
        obj[ability.id] = ability;
        return obj;
      }, {});
      dispatch(abilityActions.fetchAbilitiesSuccess(abilityDomains, abilities));
    })
    .catch(function(err) {
      dispatch(abilityActions.fetchAbilitiesFailure(err.message));
    });
};
