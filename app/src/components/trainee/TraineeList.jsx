import React from 'react';
import PropTypes from 'prop-types';
import DropOption from '../common/DropOption';
import { Table, Modal } from 'antd';

const TraineeList = ({ showDetailModal, showModifyModal, ...tableProps }) => {
  const handleAction = (record, e) => {
    if (e.key === 'modify') {
      showModifyModal(record);
    } else if (e.key === 'delete') {
      Modal.confirm({
        title: '您确定要学生 [ ' + record.name + ' ] 么？',
        onOk() {},
      });
    } else if (e.key === 'recommend') {
    }
  };
  const columns = [
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
      //render: (text, record) => <Link to={`/trainees/${record.id}`}>{text}</Link>,
      render: (text, record) =>
        <span>
          <a href="#" onClick={() => showDetailModal(record)}>
            text
          </a>
        </span>,
    },
    {
      title: '性别',
      dataIndex: 'sex',
      key: 'sex',
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
            { key: 'modify', name: '修改' },
            { key: 'delete', name: '删除' },
            {
              key: 'recommend',
              name: '推荐列表',
            },
          ]}
        />,
    },
  ];
  return (
    <Table
      bordered
      simple
      rowKey={record => record.id}
      columns={columns}
      {...tableProps}
    />
  );
};

TraineeList.propTypes = {
  showDetailModal: PropTypes.func,
  showModifyModal: PropTypes.func,
};

export default TraineeList;
