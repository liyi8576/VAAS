import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CSSModules from 'react-css-modules';
import styles from '../Occupation.scss';
import { Card, Checkbox, Tooltip, Row, Col, Tabs, Icon } from 'antd';

const CheckboxGroup = Checkbox.Group;
const TabPane = Tabs.TabPane;

const defaultProps = {
  dicAbility: [],
  occupationRequire: [],
};
const propTypes = {
  dicAbility: PropTypes.array,
  occupationRequire: PropTypes.array,
};
class AbilitySelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedAbility: [],
    };
  }

  componentDidUpdate() {
    this.selectedBox.scrollTop =
      this.selectedBox.scrollHeight - this.selectedBox.clientHeight;
  }

  selectAbility(id) {
    this.setState({
      selectedAbility: this.state.selectedAbility.concat([id]),
    });
  }

  unselectAbility(id) {
    const ids = this.state.selectedAbility.concat([]);
    const idx = ids.findIndex(_id => _id === id || _id === '!' + id);
    idx !== -1 && ids.splice(idx, 1);
    this.setState({
      selectedAbility: ids,
    });
  }

  toggleNecessary(id, isNecessary) {
    const ids = this.state.selectedAbility.concat([]);
    const idx = ids.indexOf(isNecessary ? id : '!' + id);
    idx !== -1 && (ids[idx] = isNecessary ? '!' + id : id);
    this.setState({
      selectedAbility: ids,
    });
  }

  filterAbility(abilityItems) {
    const ids = this.state.selectedAbility.map(id => id.replace('!', ''));
    return abilityItems.filter(ability => ids.indexOf(ability.id) === -1);
  }

  getDomainMap() {
    const map = new Map();
    this.props.dicAbility.forEach(domain =>
      map.set(domain.prefix, {
        icon: domain.icon,
      }),
    );
    return map;
  }

  getDomainByAbilityId(domainMap, abilityId) {
    return domainMap.get(abilityId.charAt(0));
  }

  getAbilityMap() {
    const map = new Map();
    this.props.dicAbility.forEach(domain =>
      domain.abilityItems.forEach(ability => map.set(ability.id, ability.name)),
    );
    return map;
  }

  getAbilityByIds(map, ...ids) {
    const result = [];
    ids.forEach(id => {
      let necessary = false;
      if (id.startsWith('!')) {
        id = id.slice(1);
        necessary = true;
      }
      let name = map.get(id);
      name && result.push({ id: id, name: name, necessary: necessary });
    });
    return result;
  }

  render() {
    const domainMap = this.getDomainMap();
    const abilityMap = this.getAbilityMap();
    return (
      <Row styleName="ability-sel">
        <Col span={14}>
          <CheckboxGroup style={{ float: 'left' }}>
            {this.props.occupationRequire.map(require =>
              <Tooltip
                placement="bottom"
                key={'tp-' + require.id}
                title={
                  <ul styleName="checkbox-tips">
                    <li>选择此项时，以下为必要能力:</li>
                    {this.getAbilityByIds(
                      abilityMap,
                      ...require.necessaryAbility,
                    ).map(it =>
                      <li key={'tips.' + it.id}>
                        {it.name}
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
          <Tabs size="small">
            {this.props.dicAbility.map(domain =>
              <TabPane
                tab={
                  <span>
                    {domain.name}
                    <Icon type={domain.icon} />
                  </span>
                }
                key={'domain.' + domain.name}
              >
                <ul styleName="options-items">
                  {this.filterAbility(domain.abilityItems).map(ability =>
                    <li
                      key={'option.' + ability.id}
                      title={ability.name}
                      onClick={this.selectAbility.bind(this, ability.id)}
                    >
                      {ability.name}
                    </li>,
                  )}
                </ul>
              </TabPane>,
            )}
          </Tabs>
        </Col>
        <Col span={10} styleName="selected">
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
            <ul
              styleName="selected-items"
              ref={ref => (this.selectedBox = ref)}
            >
              {this.getAbilityByIds(
                abilityMap,
                ...this.state.selectedAbility,
              ).map(ability =>
                <li
                  title={ability.name}
                  key={'sel.' + ability.id}
                  styleName={ability.necessary ? 'necessary' : 'secondary'}
                >
                  <div
                    onClick={this.toggleNecessary.bind(
                      this,
                      ability.id,
                      !ability.necessary,
                    )}
                  >
                    <span>
                      {ability.necessary ? '必要' : '次要'}
                    </span>
                    {ability.name}
                    <Icon
                      type={
                        this.getDomainByAbilityId(domainMap, ability.id).icon
                      }
                    />
                  </div>
                  <Icon
                    type="close"
                    onClick={this.unselectAbility.bind(this, ability.id)}
                  />
                </li>,
              )}
            </ul>
          </Card>
        </Col>
      </Row>
    );
  }
}

AbilitySelect.PropTypes = defaultProps;
AbilitySelect.defaultProps = propTypes;
export default CSSModules(AbilitySelect, styles);
