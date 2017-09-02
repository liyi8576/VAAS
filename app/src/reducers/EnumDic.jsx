import axios from 'axios';
import { getApiUrl } from 'api';
import _ from 'lodash';
import { createActions, handleActions } from 'redux-actions';

export const types = {
  FETCH_DIC_LIST_SUCCESS: 'ENUM_DIC/FETCH_DIC_LIST_SUCCESS',
  FETCH_DIC_LIST_FAILURE: 'ENUM_DIC/FETCH_DIC_LIST_FAILURE',
};
export const initialState = {
  enumDics: {},
};
export default handleActions(
  {
    [types.FETCH_DIC_LIST_SUCCESS]: (state, action) => ({
      ...state,
      enumDics: action.payload,
    }),
    [types.FETCH_DIC_LIST_FAILURE]: (state, action) => ({
      ...state,
      error: action.payload,
    }),
  },
  initialState,
);
export const { enumDic: enumDicActions } = createActions({
  [types.FETCH_DIC_LIST_SUCCESS]: enumDics => enumDics,
  [types.FETCH_DIC_LIST_FAILURE]: error => error,
});

export const loadEnumDic = () => dispatch => {
  axios
    .get(getApiUrl(`dics`))
    .then(response => {
      const result = response.data;
      let dicData = _.groupBy(result.data, 'group');
      dicData = _.reduce(
        dicData,
        (result, dics, key) => {
          result[key] = dics.reduce((obj, dic) => {
            obj[dic.value] = dic.name;
            return obj;
          }, {});
          return result;
        },
        {},
      );
      dispatch(enumDicActions.fetchDicListSuccess(dicData));
    })
    .catch(function(err) {
      dispatch(enumDicActions.fetchDicListFailure(err.message));
    });
};

export const getDicHelper = enumDicObj => {
  return {
    getDicName: (group, key) => {
      const dicGroup = enumDicObj[group] || [];
      return dicGroup[key]||'N/A';
    },
    getDicsByGroup: group => {
      const dicGroup = enumDicObj[group] || [];
      return _.reduce(
        dicGroup,
        (dicAry, name, key) => {
          dicAry.push({ name: name, value: key });
          return dicAry;
        },
        [],
      );
    },
  };
};
