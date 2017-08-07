import React, { Component } from 'react';
import CSSModules from 'react-css-modules';
import PropTypes from 'prop-types';
import { Menu, Icon, Layout } from 'antd';
import screenfull from 'screenfull';
import styles from './Header.scss';

const SubMenu = Menu.SubMenu;
class Header extends Component {
  static defaultProps = {
    toggleNav: () => {},
  };
  static propTypes = {
    toggleNav: PropTypes.func,
    collapsed: PropTypes.bool,
  };
  state = {
    theme: 'light',
  };
  screenFull = () => {
    if (screenfull.enabled) {
      screenfull.request();
    }
  };
  render() {
    return (
      <Layout.Header styleName="header">
        <div styleName="button" onClick={this.props.toggleNav}>
          <Icon type={this.props.collapsed ? 'menu-unfold' : 'menu-fold'} />
        </div>
        <div styleName="rightWarpper">
          <div styleName="button" onClick={this.screenFull}>
            <Icon type="arrows-alt" />
          </div>
          <Menu mode="horizontal" styleName="func-menu">
            <SubMenu
              title={
                <span>
                  <Icon type="user" /> XXX
                </span>
              }
            >
              <Menu.Item key="setting:2">个人信息</Menu.Item>
              <Menu.Item key="setting:4">系统设置</Menu.Item>
            </SubMenu>
          </Menu>
        </div>
      </Layout.Header>
    );
  }
}
export default CSSModules(Header, styles);
