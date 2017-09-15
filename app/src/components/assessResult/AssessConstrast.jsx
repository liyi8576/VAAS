import React from 'react';
import { Table, Icon, Alert, Tooltip } from 'antd';
import PropTypes from 'prop-types';
import styles from 'style/AssessConstrast.scss';
import CSSModules from 'react-css-modules';
import ConstrastSearchBar from './ConstrastSearchBar';
import Constants from 'Constants';

const { Column, ColumnGroup } = Table;
const AssessConstrast = ({
  loading = false,
  traineeId,
  occupationId,
  constrastResult = [],
}) => {
  const render_info = () =>
    <div styleName="constrast-info">
      <h4>检核结果计算规则说明：</h4>
      <ol>
        <li>
          符合基本检核标准的项目,以<span>
            <Icon type={'check'} />
          </span>表示
        </li>
        <li>
          优于基本检核标准则,以<span>
            <Icon type={'star-o'} />
          </span>表示
        </li>
        <li>
          低于基本检核标准则，以<span>
            <Icon type={'minus'} />
          </span>表示
        </li>
        <li>
          小计计算公式：<span>对照相符之数目</span>/<span>职业所列之必要&次要能力项目数</span>;<br />如：该职业工作人格的必要能力项目为5项，而符合要求的有3项，则记为3/5，若有*出现，则在分子部分表示之，如3**/5
        </li>
      </ol>
    </div>;
  const render_result = (criterion, assess, ico) =>
    <Tooltip title={`检核标准:${criterion}  考核结果：${assess}`}>
      <Icon type={ico} />
    </Tooltip>;
  const render_group = (title, type, domainId) => {
    return (
      <ColumnGroup title={title} className={`thg-${type}-sub`}>
        <Column
          className={`th-${type}-col col-ability`}
          title="能力项"
          width={100}
          dataIndex={`${type}_${domainId}`}
          key={`cg-${type}-${domainId}-ability`}
          render={(text, record) => {
            return (text && `${text.abilityId}-${text.abilityName}`) || '';
          }}
        />
        <Column
          className={`th-${type}-col col-result`}
          title="结果"
          width={60}
          dataIndex={`${type}_${domainId}`}
          key={`cg-${type}-${domainId}-result`}
          render={(text, record) => {
            const result = text && text.result;
            if (result === 0) {
              return render_result(text.criterion, text.assess, 'check');
            }
            if (result > 0) {
              return render_result(text.criterion, text.assess, 'star-o');
            }
            if (result < 0) {
              return render_result(text.criterion, text.assess, 'minus');
            }
          }}
        />
      </ColumnGroup>
    );
  };
  const render_groupType = (title, type) =>
    <ColumnGroup title={title} className={`thg-${type}`}>
      {/**Object.keys(Constants.DOMAIN_CONFIG).map(domainId => {
        const domainName = Constants.DOMAIN_CONFIG[domainId];
        {
          render_group(domainName, type, domainId);
        }
      })**/}
      {render_group('工作人格', type, '101')}
      {render_group('职业技能', type, '102')}
      {render_group('社区独立生活能力', type, '103')}

    </ColumnGroup>;
  return (
    <div className="content-inner">
      <ConstrastSearchBar />
      <Table
        size="small"
        bordered
        styleName={'constrastTable'}
        loading={loading}
        pagination={false}
        rowKey={(record, idx) => `record_${idx}`}
        dataSource={constrastResult}
      >
        {render_groupType('必要项目', 'necessary')}
        {render_groupType('次要项目', 'secondary')}
      </Table>
      <Alert
        message={render_info()}
        type="info"
        showIcon
        style={{ marginTop: '15px' }}
      />
    </div>
  );
};
AssessConstrast.PropTypes = {
  loading: PropTypes.bool,
  traineeId: PropTypes.string,
  occupationId: PropTypes.string,
  constrastResult: PropTypes.array,
};
export default CSSModules(AssessConstrast, styles);
