import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Collapse, Icon } from 'antd';
import AbilityItem from './AbilityItem';
import CSSModules from 'react-css-modules';
import styles from 'style/Assessment.scss';

const Panel = Collapse.Panel;

class AbilitySelect extends Component {
  constructor(props) {
    super();
    this.state = {
      expand: false,
    };
  }
  expandSelector = () => {
    this.setState({
      expand: !this.state.expand,
    });
  };
  render() {
    return (
      <div>
        <div
          styleName={'ability-items'}
          style={{ display: this.state.expand ? 'block' : 'none' }}
        >
          <Collapse bordered={false} defaultActiveKey={['1']}>
            <Panel header="工作人格" key="1">
              {AbilityItem({ name: '出行', option: 'A' })}
              {AbilityItem({ name: '个人卫生与保健-涣洗与整饰', option: 'B' })}
              {AbilityItem({ name: '工作姿势-跨（跳）', option: 'A' })}
              {AbilityItem({ name: '购物与消费-购物物品', option: 'D' })}
              {AbilityItem({ name: '家庭维持-烹饪的能力', option: 'C' })}
            </Panel>
            <Panel header="职业能力" key="2" />
            <Panel header="社区独立能力" key="3" />
          </Collapse>
        </div>
        <div styleName={'asm-expand'} onClick={this.expandSelector}>
          <div styleName={'expand-button'}>
            <Icon type={this.state.expand?'caret-up':"caret-down"} />
          </div>
        </div>
      </div>
    );
  }
}

AbilitySelect.propTypes = {
  expand: PropTypes.bool,
};
export default CSSModules(AbilitySelect, styles);
