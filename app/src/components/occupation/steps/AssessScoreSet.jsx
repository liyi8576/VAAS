import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CSSModules from 'react-css-modules';
import { Select, Card, Table } from 'antd';
import styles from 'style/Occupation.scss';
import _ from 'lodash';

const Option = Select.Option;
class AssessScoreSet extends Component {
  constructor(props) {
    super();
    this.state = {
      necessaryAbility: [],
      secondaryAbility: [],
    };
  }
  componentWillMount() {
    if (this.props.occupation) {
      const { necessaryAbility, secondaryAbility } = this.props.occupation;
      this.setState({
        necessaryAbility: necessaryAbility,
        secondaryAbility: secondaryAbility,
      });
    }
  }
  componentDidMount() {
    this.props.setValidateFunc(() => {
      return this.state;
    });
    this.props.setGetFieldValuesFunc(() => this.state);
  }
  changeScore = (id, score) => {
    let obj = _.find(this.state.necessaryAbility, { abilityId: id });
    if (!obj) {
      obj = _.find(this.state.secondaryAbility, { abilityId: id });
    }
    if (obj) {
      obj['criterionScore'] = score;
    }
    this.setState({
      necessaryAbility: this.state.necessaryAbility,
      secondaryAbility: this.state.secondaryAbility,
    });
  };
  render() {
    const columns = [
      {
        title: '能力编号',
        dataIndex: 'abilityId',
        key: 'abilityId',
        width: '25%',
      },
      {
        title: '能力',
        dataIndex: 'name',
        key: 'name',
        width: '45%',
        render: (record, text) => {
          return this.props.ability.abilities[text['abilityId']].name;
        },
      },
      {
        title: '检核标准',
        dataIndex: 'criterionScore',
        key: 'criterionScore',
        width: '30%',
        render: (record, text) => {
          return (
            <Select
              placeholder="请选择检核标准"
              style={{ width: 120 }}
              value={text['criterionScore']}
              key={'s_' + text['abilityId']}
              onChange={val => {
                this.changeScore(text['abilityId'], val);
              }}
            >
              <Option value="A">A</Option>
              <Option value="B">B</Option>
              <Option value="C">C</Option>
              <Option value="D">D</Option>
            </Select>
          );
        },
      },
    ];
    return (
      <div styleName="form">
        <Card
          title={
            <span>
              职业所需<span styleName="necessary">必要</span>能力
            </span>
          }
          bordered={false}
          noHovering="false"
        >
          <Table
            bordered
            simple
            pagination={false}
            rowKey={record => 'n__' + record.abilityId}
            dataSource={this.state.necessaryAbility}
            columns={columns}
          />
        </Card>
        <Card
          title={
            <span>
              职业所需<span styleName="secondary">次要</span>能力
            </span>
          }
          bordered={false}
          noHovering="false"
        >
          <Table
            bordered
            simple
            pagination={false}
            rowKey={record => 's__' + record.abilityId}
            columns={columns}
            dataSource={this.state.secondaryAbility}
          />
        </Card>
      </div>
    );
  }
}
AssessScoreSet.PropTypes = {
  occupation: PropTypes.object,
  ability: PropTypes.object,
  setValidateFunc: PropTypes.func,
  setGetFieldValuesFunc: PropTypes.func,
};
AssessScoreSet.defaultProps = {};
export default CSSModules(AssessScoreSet, styles);
