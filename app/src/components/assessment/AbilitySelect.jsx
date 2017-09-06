import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Collapse, Icon } from 'antd';
import Animate from 'rc-animate';
import AbilityItem from './AbilityItem';
import CSSModules from 'react-css-modules';
import styles from 'style/Assessment.scss';

const Panel = Collapse.Panel;

class AbilitySelect extends Component {
  constructor(props) {
    super();
    this.state = {
      visible: false,
    };
  }
  expandSelector = () => {
    this.setState({
      visible: !this.state.visible,
    });
  };
  render_items() {
    const customPanelStyle = {
      background: '#f9fafc',
      border: 0,
    };
    const { domain, abilities } = this.props.ability;
    return (
      <div styleName={'ability-items'}>
        <Collapse
          bordered={false}
          defaultActiveKey={Object.keys(domain).map(val => '.$' + val)}
        >
          {Object.values(domain).map(_domain =>
            <Panel
              header={_domain.name}
              key={_domain.id}
              style={customPanelStyle}
            >
              {_domain.abilities.map(abilityId => {
                const ability = abilities[abilityId];
                return (
                  ability &&
                  <AbilityItem
                    name={ability.name}
                    option={this.props.assessResult[abilityId]}
                    key={`ab.${ability.id}`}
                  />
                );
              })}
            </Panel>,
          )}
        </Collapse>
      </div>
    );
  }
  render() {
    return (
      <div>
        <div
          styleName={'asm-title'}
          title="点击展开/搜索能力选择层"
          onClick={this.expandSelector}
        >
          <div styleName={'title'}>
            <Icon type="menu-unfold" /> 工作人格 / 出行
          </div>
        </div>
        <Animate
          exclusive
          transitionName={this.state.visible ? 'slide-down' : 'slide-up'}
        >
          {this.state.visible ? this.render_items() : null}
        </Animate>
        <div styleName={'asm-expand'} onClick={this.expandSelector}>
          <div styleName={'expand-button'}>
            <Icon type={this.state.visible ? 'caret-up' : 'caret-down'} />
          </div>
        </div>
      </div>
    );
  }
}

AbilitySelect.propTypes = {
  ability: PropTypes.object,
  assessResult: PropTypes.object,
};
export default CSSModules(AbilitySelect, styles);
