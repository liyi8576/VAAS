import React, { Component } from 'react';
import { Table, Icon, Alert, Tooltip, Row } from 'antd';
import PropTypes from 'prop-types';
import styles from 'style/AssessConstrast.scss';
import CSSModules from 'react-css-modules';
import ConstrastSearchBar from './ConstrastSearchBar';
import _ from 'lodash';
import Constants from 'Constants';

const { Column, ColumnGroup } = Table;
class AssessConstrast extends Component {
  constructor(props) {
    super();
    this.state = {
      occupationId: null,
      traineeId: null,
    };
  }
  changeQuery = (type, val) => {
    if (type === 'OCCUPATION') {
      this.setState({
        occupationId: val,
      });
    }
    if (type === 'TRAINEE') {
      this.setState({
        traineeId: val,
      });
    }
    this.props.onQuery();
  };
  render_info = () => (
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
    </div>
  );
  render_result = (criterion, assess, ico) => (
    <Tooltip title={`检核标准:${criterion}  考核结果：${assess}`}>
      <Icon type={ico} />
    </Tooltip>
  );
  render_group = (title, type, domainId) => {
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
              return this.render_result(text.criterion, text.assess, 'check');
            }
            if (result > 0) {
              return this.render_result(text.criterion, text.assess, 'star-o');
            }
            if (result < 0) {
              return this.render_result(text.criterion, text.assess, 'minus');
            }
          }}
        />
      </ColumnGroup>
    );
  };
  render_groupType = (title, type) => {
    return (
      <ColumnGroup title={title} className={`thg-${type}`}>
        {/**Object.keys(Constants.DOMAIN_CONFIG).map(domainId => {
        const domainName = Constants.DOMAIN_CONFIG[domainId];
        return render_group(domainName, type, domainId);
      })**/}
        {this.render_group('工作人格', type, '101')}
        {this.render_group('职业技能', type, '102')}
        {this.render_group('社区独立生活能力', type, '103')}
      </ColumnGroup>
    );
  };
  render() {
    const tips = this.render_info();
    let occupationDesc = '';
    if (this.state.occupationId) {
      const obj = _.find(this.props.occupationList, { id: this.state.occupationId });
      occupationDesc = obj && obj['desc'];
    }
    return (
      <div className="content-inner">
        <ConstrastSearchBar
          onQuery={this.props.onQuery}
          onChange={this.changeQuery}
          occupationList={this.props.occupationList}
          traineeList={this.props.traineeList}
        />
        {this.state.occupationId && (
          <Row style={{ margin: '10px 0' }}>
            <Alert message={`职业简介:${occupationDesc}`} type="info" showIcon closable />
          </Row>
        )}
        <Table
          size="small"
          bordered
          styleName={'constrastTable'}
          loading={this.props.loading}
          pagination={false}
          rowKey={(record, idx) => `record_${idx}`}
          dataSource={this.props.constrastResult}
        >
          {this.render_groupType('必要项目', 'necessary')}
          {this.render_groupType('次要项目', 'secondary')}
        </Table>
        <Alert message={tips} type="info" showIcon style={{ marginTop: '15px' }} />
      </div>
    );
  }
}

AssessConstrast.PropTypes = {
  loading: PropTypes.bool,
  occupationList: PropTypes.array,
  traineeList: PropTypes.array,
  constrastResult: PropTypes.array,
  onQuery: PropTypes.func,
};
export default CSSModules(AssessConstrast, styles);
