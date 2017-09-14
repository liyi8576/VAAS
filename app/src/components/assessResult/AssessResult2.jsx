import React from 'react';
import { Row, Input, Table } from 'antd';
import styles from 'style/AssessResult2.scss';
import CSSModules from 'react-css-modules';

const { Column, ColumnGroup } = Table;

const AssessResult = ({ onChangeSearchTxt, onSearch, traineeName = '' }) => {
  const tiggerSearchTxt = val => {
    onSearch('traineeName', val);
  };
  const changeSearchText = e => {
    onChangeSearchTxt('traineeName', e.target.value);
  };
  const render_columns = (cls, domain, group) => [
    <Column
      className={`assess-th-${cls}`}
      title="编号"
      width="40px"
      dataIndex={`${domain}-abilityId-${group}`}
      key={`${domain}-abilityId-${group}`}
    />,
    <Column
      className={`assess-th-${cls}`}
      title="项目"
      width="80px"
      dataIndex={`${domain}-abilityName-${group}`}
      key={`${domain}-abilityName-${group}`}
    />,
    <Column
      className={`assess-th-${cls}`}
      title="检核结果"
      width="50px"
      dataIndex={`${domain}-assessOption-${group}`}
      key={`${domain}-assessOption-${group}`}
    />,
  ];
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
      <Table size="small" bordered>
        <ColumnGroup title="工作人格" className="assess-thg-person">
          {render_columns('person', '101', '1')}
        </ColumnGroup>
        <ColumnGroup title="职业能力" className="assess-thg-occupation">
          {render_columns('occupation', '102', '1')}
          {render_columns('occupation', '102', '2')}
        </ColumnGroup>
        <ColumnGroup title="社区独立生活技能" className="assess-thg-life">
          {render_columns('life', '103', '1')}
          <Column
            title="生活品质指数"
            className="assess-th-life"
            width="60px"
            dataIndex="102.assessOption"
            key="103.lifeIndi"
          />
        </ColumnGroup>
      </Table>
    </div>
  );
};

export default CSSModules(AssessResult, styles);
