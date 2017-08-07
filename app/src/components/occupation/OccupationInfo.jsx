import React from 'react';
import { Card, Row, Table } from 'antd';
import styles from './Occupation.scss';
import CSSModules from 'react-css-modules';

const OccupationInfo = ({}) => {
  const columns = [
    {
      title: '能力编号',
      dataIndex: 'id',
      key: 'id',
      width: '25%',
    },
    { title: '能力', dataIndex: 'ability', key: 'ability', width: '45%' },
    {
      title: '检核标准',
      dataIndex: 'criterion_score',
      key: 'criterion_score',
      width: '30%',
    },
  ];
  return (
    <div className="content-inner" styleName="detail" >
      <Row>
        <h2>职业名称：程序员</h2>
        <p styleName="desc">
          简称码农，是从事程序开发、维护的专业人员。一般将程序员分为程序设计人员和程序编码人员
        </p>
      </Row>
      <Row>
        <Card
          title={
            <span>
              职业能力要求 (<span styleName="necessary">必要技能</span>):
            </span>
          }
          bordered={false}
          noHovering="false"
        >
          <Table
            bordered={false}
            simple
            pagination={false}
            rowKey={record => record.id}
            columns={columns}
          />
        </Card>
      </Row>
      <Row>
        <Card
          title={
            <span>
              职业能力要求 (<span styleName="secondary">次要技能</span>):
            </span>
          }
          bordered={false}
          noHovering="false"
        >
          <Table
            bordered={false}
            simple
            pagination={false}
            rowKey={record => record.id}
            columns={columns}
          />
        </Card>
      </Row>
    </div>
  );
};
export default CSSModules(OccupationInfo, styles);
