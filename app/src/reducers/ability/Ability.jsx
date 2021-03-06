import axios from 'axios';
import { getApiUrl } from 'api';
import _ from 'lodash';
import Constants from 'Constants';
import { createActions, handleActions } from 'redux-actions';

export const types = {
  FETCH_ABILITIES_REQUEST: 'ABILITY/FETCH_ABILITIES_REQUEST',
  FETCH_ABILITIES_SUCCESS: 'ABILITY/FETCH_ABILITIES_SUCCESS',
  FETCH_ABILITIES_FAILURE: 'ABILITY/FETCH_ABILITIES_FAILURE',
  FETCH_ABILITIES_OPTIONS_REQUEST: 'ABILITY/FETCH_ABILITIES_OPTIONS_REQUEST',
  FETCH_ABILITIES_OPTIONS_SUCCESS: 'ABILITY/FETCH_ABILITIES_OPTIONS_SUCCESS',
  FETCH_ABILITIES_OPTIONS_FAILURE: 'ABILITY/FETCH_ABILITIES_OPTIONS_FAILURE',
  FETCH_ABILITY_DETAIL_REQUEST: 'ABILITY/FETCH_ABILITY_DETAIL_REQUEST',
  FETCH_ABILITY_DETAIL_SUCCESS: 'ABILITY/FETCH_ABILITY_DETAIL_SUCCESS',
  FETCH_ABILITY_DETAIL_FAILURE: 'ABILITY/FETCH_ABILITY_DETAIL_FAILURE',
};
export const initialState = {
  domain: {},
  abilities: {},
  error: '',
  abilityDetail: {},
  options: {},
  loading_abilities: true,
  loading_abilityOptions: true,
  loading_abilityDetail: true,
};
export default handleActions(
  {
    [types.FETCH_ABILITIES_REQUEST]: (state, action) => ({
      ...state,
      loading_abilities: true,
    }),
    [types.FETCH_ABILITIES_SUCCESS]: (state, action) => ({
      ...state,
      domain: action.payload.domain,
      abilities: action.payload.abilities,
      loading_abilities: false,
    }),
    [types.FETCH_ABILITIES_FAILURE]: (state, action) => ({
      ...state,
      error: action.payload,
      loading_abilities: false,
    }),
    [types.FETCH_ABILITIES_OPTIONS_REQUEST]: (state, action) => ({
      ...state,
      loading_abilityOptions: true,
    }),
    [types.FETCH_ABILITIES_OPTIONS_SUCCESS]: (state, action) => ({
      ...state,
      options: action.payload,
      loading_abilityOptions: false,
    }),
    [types.FETCH_ABILITIES_OPTIONS_FAILURE]: (state, action) => ({
      ...state,
      error: action.payload,
      loading_abilityOptions: false,
    }),
    [types.FETCH_ABILITY_DETAIL_REQUEST]: (state, action) => ({
      ...state,
      loading_abilityDetail: true,
    }),
    [types.FETCH_ABILITY_DETAIL_SUCCESS]: (state, action) => ({
      ...state,
      abilityDetail: action.payload,
      loading_abilityDetail: false,
    }),
    [types.FETCH_ABILITY_DETAIL_FAILURE]: (state, action) => ({
      ...state,
      error: action.payload,
      loading_abilityDetail: false,
    }),
  },
  initialState
);
export const { ability: abilityActions } = createActions({
  [types.FETCH_ABILITIES_REQUEST]: undefined,
  [types.FETCH_ABILITIES_SUCCESS]: (domain, abilities) => ({
    domain,
    abilities,
  }),
  [types.FETCH_ABILITIES_FAILURE]: error => error,
  [types.FETCH_ABILITIES_OPTIONS_REQUEST]: undefined,
  [types.FETCH_ABILITIES_OPTIONS_SUCCESS]: options => options,
  [types.FETCH_ABILITIES_OPTIONS_FAILURE]: error => error,
  [types.FETCH_ABILITY_DETAIL_REQUEST]: undefined,
  [types.FETCH_ABILITY_DETAIL_SUCCESS]: options => options,
  [types.FETCH_ABILITY_DETAIL_FAILURE]: error => error,
});

/**
 * 加载所有的检核能力项
 * @return {function(*, *)}
 */
export const loadAbilities = () => (dispatch, getState) => {
  const state = getState();
  const { abilities } = state.ability || {};
  if (abilities && Object.keys(abilities).length > 0) {
    return;
  }
  dispatch(abilityActions.fetchAbilitiesRequest());
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
            ...Constants.DOMAIN_CONFIG[key],
            abilities: _.map(abilities, 'id'),
          };
          return obj;
        },
        {}
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

/**
 * 加载所有的能力项包含检核选项
 * @param abilityId
 * @param offset
 * @param limit
 * @return {function(*, *)}
 */
export const loadAbilityOptions = (abilityId, offset, limit) => (dispatch, getState) => {
  dispatch(abilityActions.fetchAbilitiesOptionsRequest());
  axios
    .get(getApiUrl(`abilities/options`))
    .then(response => {
      const result = response.data;
      const g = _.groupBy(result.data || [], 'id');
      const abilityOption = _.reduce(
        g,
        (obj, option, key) => {
          obj[key] = option[0];
          return obj;
        },
        {}
      );
      dispatch(abilityActions.fetchAbilitiesOptionsSuccess(abilityOption));
    })
    .catch(function(err) {
      dispatch(abilityActions.fetchAbilitiesOptionsFailure(err.message));
    });
};

/**
 * 根据能力项编码,获取能力项明细信息
 * @param abilityId
 * @return {function(*, *)}
 */
export const loadAbilityDetail = abilityId => (dispatch, getState) => {
  dispatch(abilityActions.fetchAbilityDetailRequest());
  axios
    .get(getApiUrl(`abilities/${abilityId}`))
    .then(response => {
      const result = response.data;
      dispatch(abilityActions.fetchAbilityDetailSuccess(result.data));
    })
    .catch(function(err) {
      dispatch(abilityActions.fetchAbilityDetailFailure(err.message));
    });
};
