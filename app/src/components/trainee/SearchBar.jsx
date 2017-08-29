import React from 'react';
import { Row, Input } from 'antd';
import PropTypes from 'prop-types';
const SearchBar = ({ traineeName = '', onChangeSearchTxt, onSearch }) => {
  const tiggerSearchTraineeName = val => {
    onSearch('traineeName', val);
  };
  const changeSearchText = (e) => {
    onChangeSearchTxt('traineeName', e.target.value);
  };
  return (
    <Row>
      <Input.Search
        placeholder="请输入学生姓名:"
        id="traineeNameSearch"
        style={{ width: 200 }}
        onChange={changeSearchText}
        onSearch={tiggerSearchTraineeName}
        defaultValue={traineeName}
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
