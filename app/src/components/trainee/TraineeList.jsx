/**
 * @Author:      liyi
 * @DateTime:    2017-08-10
 * @description: 学生管理 / 学生列表组件
 */

import React from 'react';
import PropTypes from 'prop-types';
import SearchBar from './SearchBar';
import DropOption from '../common/DropOption';
import { Row, Col, Table, Button } from 'antd';

const TraineeList = ({
  searchCond = {}, // 查询条件
  traineeList = [], // 查询返回结果列表
  pagination = { pageSize: 10 },
  loading,
  onSearch, // 查询触发回调函数
  onChangeSearchTxt,
  onChangeTable, // 表格分页、排序触发回调函数
  onActionTrigger, // 功能操作触发回调函数
}) => {
  const tiggerCreateAction = val => {
    onActionTrigger('CREATE');
  };
  return (
    <div className="content-inner">
      <Row type="flex" justify="space-between" style={{ marginBottom: '10px' }}>
        <Col>
          <SearchBar
            {...searchCond}
            onSearch={onSearch}
            onChangeSearchTxt={onChangeSearchTxt}
          />
        </Col>
        <Col>
          <Button type="primary" icon="plus" onClick={tiggerCreateAction}>
            新增学生
          </Button>
        </Col>
      </Row>
      <Table
        bordered
        simple
        size="middle"
        loading={loading}
        pagination={configPagination(pagination)}
        rowKey={record => record.id}
        columns={configColumns(onActionTrigger)}
        dataSource={traineeList}
        onChange={onChangeTable}
      />
    </div>
  );
};
TraineeList.propTypes = {
  searchCond: PropTypes.object,
  traineeList: PropTypes.arrayOf(PropTypes.object),
  pagination: PropTypes.shape({
    current: PropTypes.integer,
    total: PropTypes.integer,
    pageSize: PropTypes.integer,
  }),
  loading: PropTypes.bool,
  onSearch: PropTypes.func,
  onChangeSearchTxt: PropTypes.func,
  onChangeTable: PropTypes.func,
  onActionTrigger: PropTypes.func,
};
export default TraineeList;

const configColumns = onActionTrigger => {
  const handleAction = (record, e) => {
    onActionTrigger(e.key, record);
  };
  return [
    {
      title: '编号',
      key: 'num',
      width: 80,
      render: (text, record, index) => index + 1,
    },
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) =>
        <span>
          <a href="#" onClick={() => onActionTrigger('VIEW', record)}>
            {text}
          </a>
        </span>,
    },
    {
      title: '性别',
      dataIndex: 'sex',
      key: 'sex',
      render: (text, record) => (record.sex === 'M' ? '男' : '女'),
    },
    {
      title: '年龄',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: '监护人',
      dataIndex: 'guardian',
      key: 'guardian',
    },
    {
      title: '联系方式',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: '住址',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: '操作',
      width: 100,
      key: 'action',
      render: (text, record) =>
        <DropOption
          onMenuClick={e => handleAction(record, e)}
          menuOptions={[
            { key: 'VIEW', name: '查看' },
            { key: 'MODIFY', name: '修改' },
            { key: 'DELETE', name: '删除' },
            { key: 'SHOW_RECOMMEND', name: '推荐列表' },
          ]}
        />,
    },
  ];
};

const configPagination = pagination => {
  return {
    current: pagination.current || 1,
    total: pagination.total || 0,
    pageSize: pagination.pageSize || 10,
    showTotal() {
      return `共 ${pagination.total} 条记录`;
    },
  };
};
