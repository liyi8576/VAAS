import React from 'react'
import PropTypes from 'prop-types'
import {Row, Col, Input, Button} from 'antd';

const TraineeFilter = ({showCreateModal}) => {
  return (
    <Row type="flex" justify="space-between" style={{marginBottom: '16px'}}>
      <Col>
        <Input.Search
          placeholder="请输入学生姓名:"
          style={{width: 200}}
          onSearch={value => console.log(value)}
        />
        <Button type="primary" style={{marginLeft: '5px'}}>查询</Button>
      </Col>
      <Col>
        <Button icon="plus" onClick={showCreateModal}>新增用户</Button>
      </Col>
    </Row>
  )
};

TraineeFilter.propTypes = {
  showCreateModal:PropTypes.func
};

export default TraineeFilter;
