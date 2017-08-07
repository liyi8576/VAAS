import React from 'react';
import { Table, Modal } from 'antd';
import DropOption from '../common/DropOption';
import CSSModules from 'react-css-modules';
import PropTypes from 'prop-types';
import styles from './Occupation.scss';

const OccupationList = ({
  showDetailModal,
  showModifyModal,
  ...tableProps
}) => {
  const handleAction = (record, e) => {
    if (e.key === 'modify') {
      showModifyModal(record);
    } else if (e.key === 'delete') {
      Modal.confirm({
        title: '您确定要删除职业 [ ' + record.name + ' ] 么？',
        onOk() {},
      });
    } else if (e.key === 'recommend') {
    }
  };
  const columns = [
    {
      title: '职业名称',
      dataIndex: 'name',
      key: 'occupation.name',
      width: 120,
      render: (text, record) =>
        <span>
          <a href="#" onClick={() => showDetailModal(record)}>
            {text}
          </a>
        </span>,
    },
    {
      title: '职业描述',
      dataIndex: 'desc',
      key: 'occupation.desc',
    },
    {
      title: '必要能力',
      dataIndex: 'necessary_ability',
      key: 'necessary_ability',
      width: 250,
      render: (text, record) => '能力1,能力2，能力3，能力4，能力5',
    },
    {
      title: '次要能力',
      dataIndex: 'secondary_ability',
      key: 'secondary_ability',
      width: 250,
      render: (text, record) => '能力1,能力2，能力3，能力4，能力5',
    },
    {
      title: '操作',
      key: 'action',
      width: 100,
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
    <div className="content-inner">
      <Table
        bordered
        simple
        rowKey={record => record.id}
        columns={columns}
        {...tableProps}
      />
    </div>
  );
};
OccupationList.propTypes = {
  showDetailModal: PropTypes.func,
  showModifyModal: PropTypes.func,
};
export default CSSModules(OccupationList, styles);
