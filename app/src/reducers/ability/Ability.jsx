import axios from 'axios';
import { getApiUrl } from 'api';
import _ from 'lodash';
import Constants from 'Constants';
import { createActions, handleActions } from 'redux-actions';

export const types = {
  FETCH_ABILITIES_SUCCESS: 'ABILITY/FETCH_ABILITIES_SUCCESS',
  FETCH_ABILITIES_FAILURE: 'ABILITY/FETCH_ABILITIES_FAILURE',
  FETCH_ABILITIES_OPTIONS_REQUEST: 'ABILITY/FETCH_ABILITIES_OPTIONS_REQUEST',
  FETCH_ABILITIES_OPTIONS_SUCCESS: 'ABILITY/FETCH_ABILITIES_OPTIONS_SUCCESS',
  FETCH_ABILITIES_OPTIONS_FAILURE: 'ABILITY/FETCH_ABILITIES_OPTIONS_FAILURE',
};
export const initialState = {
  domain: {},
  abilities: {},
  error: '',
  options: {},
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
    [types.FETCH_ABILITIES_OPTIONS_SUCCESS]: (state, action) => ({
      ...state,
      fetch_options_loading: true,
    }),
    [types.FETCH_ABILITIES_OPTIONS_SUCCESS]: (state, action) => ({
      ...state,
      options: action.payload,
      fetch_options_loading: false,
    }),
    [types.FETCH_ABILITIES_OPTIONS_FAILURE]: (state, action) => ({
      ...state,
      error: action.payload,
      fetch_options_loading: false,
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
  [types.FETCH_ABILITIES_OPTIONS_REQUEST]: undefined,
  [types.FETCH_ABILITIES_OPTIONS_SUCCESS]: options => options,
  [types.FETCH_ABILITIES_OPTIONS_FAILURE]: error => error,
});

export const loadAbilities = () => (dispatch, getState) => {
  const state = getState();
  const { abilities } = state.ability || {};
  if (abilities && Object.keys(abilities).length > 0) {
    return;
  }
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

export const loadAbilityOptions = (abilityId, offset, limit) => (
  dispatch,
  getState,
) => {
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
        {},
      );
      dispatch(abilityActions.fetchAbilitiesOptionsSuccess(abilityOption));
    })
    .catch(function(err) {
      dispatch(abilityActions.fetchAbilitiesOptionsFailure(err.message));
    });
};
