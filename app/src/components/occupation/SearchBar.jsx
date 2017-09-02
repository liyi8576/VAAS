import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Input, Button } from 'antd';

const SearchBar = ({ occupationName = '', onChangeSearchTxt, onSearch }) => {
  const tiggerSearchTxt = val => {
    onSearch('occupationName', val);
  };
  const changeSearchText = e => {
    onChangeSearchTxt('occupationName', e.target.value);
  };
  return (
    <Row>
      <Input.Search
        placeholder="请输入职业名称:"
        id="traineeNameSearch"
        style={{ width: 200 }}
        onChange={changeSearchText}
        onSearch={tiggerSearchTxt}
        defaultValue={occupationName}
      />
    </Row>
  );
};

SearchBar.propTypes = {
  searchCond: PropTypes.object,
  onChangeSearchTxt: PropTypes.func,
  onSearch: PropTypes.func.isRequired,
  traineeName: PropTypes.string,
};
export default SearchBar;
