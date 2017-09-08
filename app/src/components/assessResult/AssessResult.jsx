import React from 'react';
import { Row, Col, Input, Table } from 'antd';
import PropTypes from 'prop-types';
import 'style/AssessResult.scss';

const { Column, ColumnGroup } = Table;

const AssessResult = ({ onChangeSearchTxt, onSearch, traineeName = '' }) => {
  const tiggerSearchTxt = val => {
    onSearch('traineeName', val);
  };
  const changeSearchText = e => {
    onChangeSearchTxt('traineeName', e.target.value);
  };
  return (
    <div className="content-inner">
      <Row style={{ marginBottom: '10px' }}>
        <Input.Search
          placeholder="请输入学生姓名:"
          id="traineeNameSearch"
          style={{ width: 200 }}
          onChange={changeSearchText}
          onSearch={tiggerSearchTxt}
          defaultValue={traineeName}
        />
      </Row>
      <Table size="small">
        <ColumnGroup title="工作人格" className="assess-thg-person">
          <Column
            className="assess-th-person"
            title="编号"
            dataIndex="101.abilityId"
            key="101.abilityId"
          />
          <Column
            className="assess-th-person"
            title="项目"
            dataIndex="101.abilityName"
            key="101.abilityName"
          />
          <Column
            className="assess-th-person"
            title="检核结果"
            dataIndex="101.assessOption"
            key="101.assessOption"
          />
        </ColumnGroup>
        <ColumnGroup title="职业能力" className="assess-thg-job">
          <Column
            title="编号"
            className="assess-th-job"
            dataIndex="102.abilityId"
            key="102.abilityId"
          />
          <Column
            title="项目"
            className="assess-th-job"
            dataIndex="102.abilityName"
            key="102.abilityName"
          />
          <Column
            title="检核结果"
            className="assess-th-job"
            dataIndex="102.assessOption"
            key="102.assessOption"
          />

        </ColumnGroup>
        <ColumnGroup title="社区独立生活技能" className="assess-thg-life">
          <Column
            title="编号"
            className="assess-th-life"
            dataIndex="102.abilityId"
            key="103.abilityId"
          />
          <Column
            title="项目"
            className="assess-th-life"
            dataIndex="102.abilityName"
            key="103.abilityName"
          />
          <Column
            title="检核结果"
            className="assess-th-life"
            dataIndex="102.assessOption"
            key="103.assessOption"
          />
          <Column
            title="生活品质指数"
            className="assess-th-life"
            dataIndex="102.lifeIndex"
            key="103.lifeIndex"
          />
        </ColumnGroup>
      </Table>
    </div>
  );
};

export default AssessResult;
