import React, { Component } from 'react';
import { Select, Spin } from 'antd';
import axios from 'axios';
import { getApiUrl } from 'api';
import debounce from 'lodash/debounce';
import _ from 'lodash';
const Option = Select.Option;

class TraineeSelector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      fetching: false,
    };
    this.searchTrainee = debounce(this.searchTrainee, 500);
  }
  searchTrainee = value => {
    this.setState({ fetching: true });
    axios
      .get(getApiUrl(`trainees`), {
        params: { traineeName: value },
      })
      .then(response => {
        const result = response.data;
        const data = result.data.list.map(user => ({
          text: user.name,
          value: user.id,
        }));
        this.setState({ data, fetching: false });
      });
  };
  handleChange = value => {
    !_.isEmpty(value) && this.searchTrainee(value);
  };
  handleSelect = (value, option) => {
    this.props.onChange(value);
  };
  render() {
    const { fetching, data } = this.state;
    return (
      <Select
        showSearch
        placeholder="请输入学生姓名并选择学员"
        notFoundContent={fetching ? <Spin size="small" tip="Loading..." /> : '未找到该学员'}
        filterOption={false}
        onSearch={this.handleChange}
        onSelect={this.handleSelect}
        showArrow
        style={{ width: '250px' }}
      >
        {data.map(d => (
          <Option key={d.value} title={d.text}>
            {d.text}
          </Option>
        ))}
      </Select>
    );
  }
}
export default TraineeSelector;
