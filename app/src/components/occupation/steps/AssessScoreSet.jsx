import React from 'react';
import PropTypes from 'prop-types';
import CSSModules from 'react-css-modules';
import {
  Form,
  Input,
  Select,
  Card,
  Table,
} from 'antd';
import styles from '../Occupation.scss';

const FormItem = Form.Item;
const Option = Select.Option;

const AssessScoreSet = ({}) => {
  const columns = [
    {
      title: '能力编号',
      dataIndex: 'id',
      key: 'id',
      width: '25%',
    },
    {title: '能力', dataIndex: 'name', key: 'name', width: '45%'},
    {
      title: '检核标准',
      dataIndex: 'criterion_score',
      key: 'criterion_score',
      width: '30%',
      render: (record, text) => (
        <Select placeholder="请选择检核标准" style={{ width: 120 }} value={record}>
          <Option value="A">A</Option>
          <Option value="B">B</Option>
          <Option value="C">C</Option>
          <Option value="D">D</Option>
        </Select>
      )
    },
  ];
  const dataSource = [{
    id: '1001',
    name: '礼貌',
    criterion_score: 'A'
  }, {
    id: '1002',
    name: '出席',
    criterion_score: 'B'
  }];
  return (
    <div styleName="form">
      <Card
        title={<span>职业所需<span styleName="necessary">必要</span>能力</span>}
        bordered={false}
        noHovering="false"
      >
        <Table
          bordered
          simple
          pagination={false}
          rowKey={record => record.id}
          dataSource={dataSource}
          columns={columns}
        />
      </Card>
      <Card
        title={<span>职业所需<span styleName="secondary">次要</span>能力</span>}
        bordered={false}
        noHovering="false"
      >
        <Table
          bordered
          simple
          pagination={false}
          rowKey={record => record.id}
          columns={columns}
        />
      </Card>
    </div>
  )
};
AssessScoreSet.PropTypes = {};
AssessScoreSet.defaultProps = {};
export default CSSModules(AssessScoreSet, styles)
