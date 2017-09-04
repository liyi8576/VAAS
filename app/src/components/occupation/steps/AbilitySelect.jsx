import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import CSSModules from 'react-css-modules';
import styles from '../../../style/Occupation.scss';
import { Card, Checkbox, Tooltip, Row, Col, Tabs, Icon } from 'antd';

const CheckboxGroup = Checkbox.Group;
const TabPane = Tabs.TabPane;

class AbilitySelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: [],
      necessary: [],
      validateWarn: false,
    };
  }
  componentWillMount() {
    if (this.props.occupation) {
      const { necessaryAbility, secondaryAbility } = this.props.occupation;
      const necessaryIds = _.map(necessaryAbility, 'abilityId');
      const secondaryIds = _.map(secondaryAbility, 'abilityId');
      this.setState({
        selected: _.uniq([...necessaryIds, ...secondaryIds]),
        necessary: [...necessaryIds],
      });
    }
  }
  componentDidMount() {
    this.props.setValidateFunc(() => {
      if (this.state.selected.length === 0) {
        this.setState({ validateWarn: true });
        return null;
      }
      return this.getSelectResult();
    });
    this.props.setGetFieldValuesFunc(() => this.getSelectResult());
  }

  componentDidUpdate() {
    this.selectedBox.scrollTop =
      this.selectedBox.scrollHeight - this.selectedBox.clientHeight;
  }
  getSelectResult() {
    return {
      necessaryAbility: this.state.necessary.map(id => ({
        abilityId: id,
        criterionScore: '',
      })),
      secondaryAbility: _.without(
        this.state.selected,
        ...this.state.necessary,
      ).map(id => ({
        abilityId: id,
        criterionScore: '',
      })),
    };
  }
  selectAbility(id) {
    this.setState({
      validateWarn: false,
      selected: this.state.selected.concat([id]),
    });
  }

  unselectAbility(id) {
    this.setState({
      selected: _.without(this.state.selected, id),
      necessary: _.without(this.state.necessary, id),
    });
  }

  toggleNecessary(id, isNecessary) {
    this.setState({
      necessary: isNecessary
        ? [...this.state.necessary, id]
        : _.without(this.state.necessary, id),
    });
  }

  render_require() {
    const { abilities, config } = this.props.ability;
    return (
      <CheckboxGroup style={{ float: 'left' }}>
        {config.map(require =>
          <Tooltip
            placement="bottom"
            key={`tips-${require.id}`}
            title={
              <ul styleName="checkbox-tips">
                <li>选择此项时，以下为必要能力:</li>
                {require.necessaryAbility.map(id =>
                  <li key={`tipli-${id}`}>
                    {abilities[id] ? abilities[id].name : id}
                  </li>,
                )}
              </ul>
            }
          >
            <Checkbox value={require.id} key={require.id}>
              {require.name}
            </Checkbox>
          </Tooltip>,
        )}
      </CheckboxGroup>
    );
  }
  render_ability_tab() {
    const { domain, abilities } = this.props.ability;
    return (
      <Tabs size="small">
        {Object.values(domain).map(_domain =>
          <TabPane
            tab={
              <span>
                {_domain.name}
                <Icon type={_domain.icon} />
              </span>
            }
            key={`domain.${_domain.id}`}
          >
            <ul styleName="options-items">
              {_domain.abilities.map(id =>
                <li
                  key={'option.' + id}
                  title={abilities[id].name}
                  onClick={this.selectAbility.bind(this, id)}
                >
                  {abilities[id].name}
                </li>,
              )}
            </ul>
          </TabPane>,
        )}
      </Tabs>
    );
  }

  render_selected() {
    const { domain, abilities } = this.props.ability;
    return (
      <Card
        title={
          <span>
            已选能力<Tooltip placement="bottom" title="点击选择项,可切换必要/次要能力">
              <Icon type="question-circle-o" />
            </Tooltip>
          </span>
        }
        bordered={false}
        noHovering="false"
      >
        {this.state.validateWarn
          ? <p style={{ color: 'red' }}>请选择职业能力!</p>
          : <ul
              styleName="selected-items"
              ref={ref => (this.selectedBox = ref)}
            >
              {this.state.selected.map(id => {
                const ability = abilities[id];
                const isNessary = _.indexOf(this.state.necessary, id) !== -1;
                const itDomain = domain[ability && ability.domain] || {};
                return (
                  ability &&
                  <li
                    title={ability.name}
                    key={`sel.${ability.id}`}
                    styleName={isNessary ? 'necessary' : 'secondary'}
                  >
                    <div
                      onClick={this.toggleNecessary.bind(
                        this,
                        ability.id,
                        !isNessary,
                      )}
                    >
                      <span>
                        {isNessary ? '必要' : '次要'}
                      </span>
                      {ability.name}
                      <Icon type={itDomain.icon} />
                    </div>
                    <Icon
                      type="close"
                      onClick={this.unselectAbility.bind(this, ability.id)}
                    />
                  </li>
                );
              })}
            </ul>}
      </Card>
    );
  }
  render() {
    return (
      <Row styleName="ability-sel">
        <Col span={14}>
          {this.render_require()}
          {this.render_ability_tab()}
        </Col>
        <Col span={10} styleName="selected">
          {this.render_selected()}
        </Col>
      </Row>
    );
  }
}

AbilitySelect.PropTypes = {
  occupation: PropTypes.object,
  ability: PropTypes.object,
  setValidateFunc: PropTypes.func,
  setGetFieldValuesFunc: PropTypes.func,
};
export default CSSModules(AbilitySelect, styles);
