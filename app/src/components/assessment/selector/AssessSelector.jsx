import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Icon, Switch } from 'antd';
import CSSModules from 'react-css-modules';
import styles from 'style/Assessment.scss';
import Animate from 'rc-animate';
import AssessItemSelector from './AssessItemSelector';

/**
 * 检核项选取组件
 * @param domains 检核领域map对象
 * @param abilities 检核能力项map对象
 * @param selectedItem 当前选中检核项编码
 * @param onSelect 检核项选中回调函数
 * @return {*}
 */
class AssessSelector extends Component {
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
  selectAssessItem = item => {
    const hisAssessItem = this.state.assessItem;
    this.setState({
      visible: false,
    });
    if (hisAssessItem !== item) {
      this.props.changeAssessItem(item);
    }
  };
  changeSwitchAutoNav = checked => {
    this.props.setSwitch('autoNav', checked);
  };
  changeSwitchNavSkip = checked => {
    this.props.setSwitch('navSkip', checked);
  };
  render() {
    const currentAssessItem = this.props.abilities[this.props.assessItem];
    const currentAssessDomain =
      (currentAssessItem && this.props.domains[currentAssessItem.domain]) || {};
    return (
      <div>
        <div styleName={'asm-title'} title="点击展开/搜索能力选择层" onClick={this.expandSelector}>
          <div styleName={'title'}>
            <Icon type="menu-unfold" /> {currentAssessDomain && currentAssessDomain.name}{' '}
            &nbsp;&nbsp;>&nbsp;&nbsp;
            {currentAssessItem && currentAssessItem.name}
            <div
              style={{ float: 'right', fontSize: '12px', fontWeight: 'normal', clear: 'both' }}
              onClick={e => {
                e.stopPropagation();
              }}
            >
              <Switch size="small" defaultChecked onChange={this.changeSwitchAutoNav} />{' '}
              评定后自动切换&nbsp;&nbsp;
              <Switch size="small" defaultChecked onChange={this.changeSwitchNavSkip} />{' '}
              切换跳过已评定项
            </div>
          </div>
        </div>
        <Animate exclusive transitionName={this.state.visible ? 'slide-down' : 'slide-up'}>
          {this.state.visible && this.props.abilities && this.props.domains ? (
            <AssessItemSelector
              abilities={this.props.abilities}
              domains={this.props.domains}
              selectedItem={this.props.assessItem}
              onSelect={this.selectAssessItem}
            />
          ) : null}
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

AssessSelector.propTypes = {
  assessItem: PropTypes.string, //当前检核项
  domains: PropTypes.object, // 检核领域map对象
  abilities: PropTypes.object, // 检核能力项map对象
  changeAssessItem: PropTypes.func, //改变检核项回调函数
  setSwitch: PropTypes.func,
};
export default CSSModules(AssessSelector, styles);
