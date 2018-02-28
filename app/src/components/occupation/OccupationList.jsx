import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Table, Button } from 'antd';
import DropOption from '../common/DropOption';
import SearchBar from './SearchBar';
import CSSModules from 'react-css-modules';
import styles from 'style/Occupation.scss';

const OccupationList = ({
  searchCond = {}, // 查询条件
  occupationList = [], // 查询返回结果列表
  pagination = { pageSize: 10 },
  loading,
  onSearch, // 查询触发回调函数
  onChangeSearchTxt,
  onChangeTable, // 表格分页、排序触发回调函数
  onActionTrigger, // 功能操作触发回调函数
  ability: { domain, abilities },
}) => {
  const tiggerCreateAction = val => {
    onActionTrigger('CREATE');
  };

  return (
    <div className="content-inner">
      <Row type="flex" justify="space-between" style={{ marginBottom: '10px' }}>
        <Col>
          <SearchBar {...searchCond} onSearch={onSearch} onChangeSearchTxt={onChangeSearchTxt} />
        </Col>
        <Col>
          <Button type="primary" icon="plus" onClick={tiggerCreateAction}>
            新增职业
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
        columns={configColumns(domain, abilities, onActionTrigger)}
        dataSource={occupationList}
        onChange={onChangeTable}
      />
    </div>
  );
};
OccupationList.propTypes = {
  searchCond: PropTypes.object,
  occupationList: PropTypes.arrayOf(PropTypes.object),
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
  ability: PropTypes.shape({
    domain: PropTypes.object,
    abilities: PropTypes.object,
  }),
};

export default CSSModules(OccupationList, styles);

const configColumns = (domain = {}, abilities = {}, onActionTrigger) => {
  const handleAction = (record, e) => {
    onActionTrigger(e.key, record);
  };
  return [
    {
      title: '编号',
      width: 50,
      key: 'num',
      render: (text, record, index) => index + 1,
    },
    {
      title: '职业名称',
      dataIndex: 'name',
      key: 'occupationName',
      width: 120,
      render: (text, record) => (
        <span>
          <a href="#" onClick={() => onActionTrigger('VIEW', record)}>
            {text}
          </a>
        </span>
      ),
    },
    {
      title: '职业描述',
      width: 350,
      dataIndex: 'desc',
      key: 'occupationDesc',
    },
    {
      title: '必要能力',
      dataIndex: 'necessaryAbility',
      key: 'necessaryAbility',
      render: (text, record) => {
        return (record.necessaryAbility || [])
          .map(abilityId => (abilities[abilityId] && abilities[abilityId].name) || abilityId)
          .join(' , ');
      },
    },
    {
      title: '次要能力',
      dataIndex: 'secondaryAbility',
      key: 'secondaryAbility',
      render: (text, record) => {
        return (record.secondaryAbility || [])
          .map(abilityId => (abilities[abilityId] && abilities[abilityId].name) || abilityId)
          .join(' , ');
      },
    },
    {
      title: '操作',
      key: 'action',
      width: 80,
      render: (text, record) => (
        <DropOption
          onMenuClick={e => handleAction(record, e)}
          menuOptions={[
            { key: 'VIEW', name: '查看' },
            { key: 'MODIFY', name: '修改' },
            { key: 'DELETE', name: '删除' },
            { key: 'SHOW_RECOMMEND', name: '推荐列表' },
          ]}
        />
      ),
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
