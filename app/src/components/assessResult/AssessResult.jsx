import React from 'react';
import { Row, Table } from 'antd';
import _ from 'lodash';
import Constants from 'Constants';
import styles from 'style/AssessResult.scss';
import CSSModules from 'react-css-modules';
import TraineeSelector from 'containers/trainee/TraineeSelector';

const { Column } = Table;

const AssessResult = ({
  onChangeTrainee,
  traineeName = '',
  assessResult = [],
  lifeIndi = null,
  loading = false,
}) => {
  const changeTrainee = val => {
    onChangeTrainee(val);
  };
  const render_columns = index => [
    <Column
      className={`assess-th assess-th-id`}
      title="编号"
      width="40px"
      dataIndex={`id_${index}`}
      key={`id_${index}`}
    />,
    <Column
      className={`assess-th assess-th-name`}
      title="能力项目"
      width="90px"
      dataIndex={`name_${index}`}
      key={`name_${index}`}
    />,
    <Column
      className={`assess-th assess-th-option`}
      title="检核结果"
      width="50px"
      dataIndex={`assessOption_${index}`}
      key={`assessOption_${index}`}
    />,
  ];
  const domainNums = _.mapValues(_.groupBy(assessResult, 'domain'), ary => {
    return ary.length;
  });
  let curDomain = null;
  return (
    <div className="content-inner">
      <Row style={{ marginBottom: '10px' }}>
        <TraineeSelector onChange={changeTrainee} />
      </Row>
      <Table
        styleName={'assessTable'}
        size="small"
        bordered
        dataSource={assessResult}
        pagination={false}
        loading={loading}
        rowKey={(record, idx) => `record_${idx}`}
        rowClassName={(record, index) => {
          return `assess-tr-${record.domain}`;
        }}
        footer={
          !lifeIndi
            ? null
            : () => {
                return (
                  <span>
                    <label>生活品质指数:</label>80
                  </span>
                );
              }
        }
      >
        <Column
          title="检核领域"
          width="80px"
          dataIndex={'domain'}
          className={`assess-th assess-th-domain`}
          key={`domain`}
          render={(value, row, index) => {
            let rowspan = 0;
            if (curDomain !== value) {
              rowspan = domainNums[value];
              curDomain = value;
            }
            return {
              children: Constants.DOMAIN_CONFIG[value] && Constants.DOMAIN_CONFIG[value].name,
              props: { rowSpan: rowspan },
            };
          }}
        />,
        {render_columns(1)}
        {render_columns(2)}
        {render_columns(3)}
        {render_columns(4)}
      </Table>
    </div>
  );
};

export default CSSModules(AssessResult, styles);
