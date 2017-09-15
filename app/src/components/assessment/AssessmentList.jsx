import React from 'react';
import PropTypes from 'prop-types';
import CSSModules from 'react-css-modules';
import styles from 'style/Assessment.scss';
import { Table, Tabs } from 'antd';
import { Link } from 'react-router-dom';

const AssessmentList = ({
  assessmentList = [], // 查询返回结果列表
  pagination = { pageSize: 10 },
  loading = false,
  onActionTrigger = () => {},
  onChangeTable = () => {},
}) => {
  const TabPane = Tabs.TabPane;
  console.log(assessmentList)
  return (
    <div className="content-inner">
      <Tabs defaultActiveKey="1" size="small">
        <TabPane tab="全部" key="tab-all" />
        <TabPane tab="未检核" key="tab-willAssess" />
        <TabPane tab="检核中" key="tab-assessing" />
        <TabPane tab="已检核" key="tab-assessed" />
        <TabPane tab="评估完成" key="tab-eval" />
      </Tabs>
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
    '-1': '未检核',
    '1': '检核中',
    '2': '已检核',
    '3': '评估完成',
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
      className: 'table-col-center',
    },
    {
      title: '检核进度',
      key: 'assessPercent',
      dataIndex:'assessPercent',
      className: 'table-col-center',
      render: (text, record) => {
        return record.assessPercent+'%';
      },
    },
    {
      title: '检核状态',
      dataIndex: 'assessStatus',
      className: 'table-col-center',
      key: 'assessStatus',
      render: (text, record) => {
        return statusMap[record.assessStatus];
      },
    },
    {
      title: '检核开始日期',
      dataIndex: 'assessBeginDate',
      className: 'table-col-center',
      key: 'assessBeginDate',
    },
    {
      title: '检核结束日期',
      dataIndex: 'assessEndDate',
      className: 'table-col-center',
      key: 'assessEndDate',
    },
    {
      title: '操作',
      width: 200,
      key: 'action',
      render: (text, record) => {
        const status = record.assessStatus + '';
        if (status === '-1') {
          return <Link to={`/trainees/${record.traineeId}/assess`}>开始检核</Link>;
        }
        if (status === '1') {
          return <Link to={`/trainees/${record.traineeId}/assess`}>继续检核</Link>;
        }
        if (status === '2') {
          return (
            <span>
              <Link
                to={`/trainees/${record.traineeId}/assess`}
                style={{ marginRight: '5px' }}
              >
                继续检核
              </Link>|
              <Link
                to={`/trainees/${record.traineeId}/assess`}
                style={{ marginLeft: '5px' }}
              >
                生成评估报告
              </Link>
            </span>
          );
        }
        if (status === '3') {
          return (
            <Link to={`/trainees/${record.traineeId}/assess`}>查看评估报告</Link>
          );
        }
      },
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
