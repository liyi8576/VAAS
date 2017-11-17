import React from 'react';
import PropTypes from 'prop-types';
import { Card, Row, Table } from 'antd';
import CSSModules from 'react-css-modules';
import styles from 'style/Occupation.scss';

const OccupationInfo = ({ occupation, ability: { domain, abilities } }) => {
  const columns = [
    {
      title: '能力编号',
      dataIndex: 'abilityId',
      key: 'abilityId',
      width: '25%',
    },
    {
      title: '能力',
      dataIndex: 'ability',
      key: 'ability',
      width: '45%',
      render: (text, record) => {
        const _ability = abilities[record && record.abilityId];
        return (_ability && _ability.name) || record.abilityId;
      },
    },
    {
      title: '检核标准',
      dataIndex: 'criterionScore',
      key: 'criterionScore',
      width: '30%',
    },
  ];
  return (
    <div className="content-inner" styleName="detail">
      <Row>
        <h2>
          职业名称：{occupation.name}
        </h2>
        <p styleName="desc">
          {occupation.desc}
        </p>
      </Row>
      <Row>
        <Card
          title={
            <span>
              职业能力要求 (<span styleName="necessary">必要能力</span>):
            </span>
          }
          bordered={false}
          noHovering="false"
        >
          <Table
            bordered
            simple
            size="small"
            pagination={false}
            dataSource={occupation.necessaryAbility || []}
            rowKey={(record, idx) => `n-${record.abilityId}_${idx}`}
            columns={columns}
          />
        </Card>
      </Row>
      <Row>
        <Card
          title={
            <span>
              职业能力要求 (<span styleName="secondary">次要能力</span>):
            </span>
          }
          bordered={false}
          noHovering="false"
        >
          <Table
            bordered
            simple
            size="small"
            pagination={false}
            rowKey={(record, idx) => `s-${record.abilityId}_${idx}`}
            dataSource={occupation.secondaryAbility || []}
            columns={columns}
          />
        </Card>
      </Row>
    </div>
  );
};
OccupationInfo.propTypes = {
  occupation: PropTypes.object.isRequired,
  ability: PropTypes.shape({
    domain: PropTypes.object,
    abilities: PropTypes.object,
  }),
};
export default CSSModules(OccupationInfo, styles);
