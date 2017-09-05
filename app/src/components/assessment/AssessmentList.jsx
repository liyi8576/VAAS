import React from 'react';
import PropTypes from 'prop-types';
import CSSModules from 'react-css-modules';
import styles from 'style/Assessment.scss';
import { Table } from 'antd';
import { Link } from 'react-router-dom';

const AssessmentList = ({
  assessmentList = [], // 查询返回结果列表
  pagination = { pageSize: 10 },
  loading = false,
  onActionTrigger = () => {},
  onChangeTable = () => {},
}) => {
  return (
    <div className="content-inner">
      <Table
        bordered
        simple
        size="middle"
        loading={loading}
        pagination={configPagination(pagination)}
        rowKey={record => record.traineeId}
        columns={configColumns(onActionTrigger)}
        dataSource={assessmentList}
        onChange={onChangeTable}
      />
    </div>
  );
};

AssessmentList.propTypes = {
  assessmentList: PropTypes.arrayOf(PropTypes.object),
  pagination: PropTypes.shape({
    current: PropTypes.integer,
    total: PropTypes.integer,
    pageSize: PropTypes.integer,
  }),
  loading: PropTypes.bool,
  onActionTrigger: PropTypes.func,
};
export default CSSModules(AssessmentList, styles);

const configColumns = onActionTrigger => {
  const statusMap = {
    '-1': '未开始检核',
    '1': '检核中',
    '2': '检核完成',
    '3': '已生成检核报告',
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
      dataIndex: 'traineeName',
      key: 'name',
    },
    {
      title: '已检核数量',
      dataIndex: 'assessCount',
      key: 'assessCount',
    },
    {
      title: '检核状态',
      dataIndex: 'assessStatus',
      key: 'assessStatus',
      render: (text, record) => {
        return statusMap[record.assessStatus];
      },
    },
    {
      title: '检核开始日期',
      dataIndex: 'assessBeginDate',
      key: 'assessBeginDate',
    },
    {
      title: '检核结束日期',
      dataIndex: 'assessEndDate',
      key: 'assessEndDate',
    },
    {
      title: '操作',
      width: 100,
      key: 'action',
      render: (text, record) =>
        <Link to={`/assessment/${record.traineeId}`}>开始检核</Link>,
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
