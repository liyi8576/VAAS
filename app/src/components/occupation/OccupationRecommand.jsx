import React, { Component } from 'react';
import { Table, Alert, Row, Form, Select } from 'antd';
import PropTypes from 'prop-types';
import _ from 'lodash';

class OccupationRecommand extends Component {
  constructor(props) {
    super();
    this.state = {
      occupationId: null,
      pagination: { pageSize: 10, total: 0, current: 1 },
    };
  }
  onChangeTable = (pagination, filters, sorter) => {
    this.setState(
      {
        pagination: {
          ...this.state.pagination,
          current: pagination.current,
        },
      },
      () => this.props.onQuery(this.state.occupationId, this.state.pagination)
    );
  };
  changeOccupation = val => {
    this.setState({
      occupationId: val,
    });
    this.props.onQuery(val, this.state.pagination.current, this.state.pagination.pageSize);
  };
  configPagination = pagination => {
    const count = (this.props.recommandList && this.props.recommandList.count) || 0;
    return {
      current: pagination.current || 1,
      total: count,
      pageSize: pagination.pageSize || 10,
      showTotal() {
        return `共 ${count} 条记录`;
      },
    };
  };
  configColumns = () => {
    return [
      {
        title: '编号',
        width: 50,
        key: 'num',
        render: (text, record, index) => index + 1,
      },
      {
        title: '学院姓名',
        dataIndex: 'name',
        key: 'name',
        width: 100,
      },
      {
        title: '不符合职业所需能力项个数',
        width: 300,
        dataIndex: 'count',
        key: 'count',
      },
      {
        title: '不符合职业所需能力项',
        dataIndex: 'abilityName',
        key: 'abilityName',
      },
    ];
  };
  render_query() {
    return (
      <Row style={{ marginBottom: '10px' }}>
        <Form layout={'inline'}>
          <Form.Item label="职业">
            {this.props.form.getFieldDecorator('occupationId', {
              initialValue: this.props.occupationId,
            })(
              <Select
                placeholder={'请选择职业'}
                notFoundContent=""
                style={{ width: '200px' }}
                defaultActiveFirstOption={false}
                showSearch
                onChange={this.changeOccupation}
                filterOption={false}
              >
                {this.props.occupationList.map(item => (
                  <Select.Option value={item.id} key={`opt-${item.id}`}>
                    {item.name}
                  </Select.Option>
                ))}
              </Select>
            )}
          </Form.Item>
        </Form>
      </Row>
    );
  }
  render() {
    let occupationDesc = '';
    if (this.state.occupationId) {
      const obj = _.find(this.props.occupationList, { id: this.state.occupationId });
      occupationDesc = obj && obj['desc'];
    }
    return (
      <div className="content-inner">
        {this.render_query()}
        {this.state.occupationId && (
          <Row style={{ margin: '10px 0' }}>
            <Alert message={`职业简介:${occupationDesc}`} type="info" showIcon closable />
          </Row>
        )}
        <Table
          bordered
          loading={this.props.loading}
          pagination={this.configPagination(this.state.pagination)}
          rowKey={(record, idx) => `record_${idx}`}
          dataSource={this.props.recommandList && this.props.recommandList.list}
          columns={this.configColumns()}
          onChange={this.onChangeTable}
        />
      </div>
    );
  }
}
OccupationRecommand.defaultProps = {
  pagination: { pageSize: 10 },
};
OccupationRecommand.PropTypes = {
  loading: PropTypes.bool,
  occupationId: PropTypes.string,
  occupationList: PropTypes.array,
  recommandList: PropTypes.array,
  onQuery: PropTypes.func,
};
export default Form.create()(OccupationRecommand);
