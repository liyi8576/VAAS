import React, { Component } from 'react';
import CSSModules from 'react-css-modules';
import PropTypes from 'prop-types';
import { Layout, Menu, Icon } from 'antd';
import { Link } from 'react-router-dom';
import styles from 'style/NavSider.scss';
import logoImg from 'style/images/logo.png';

const { Sider } = Layout;

class NavSider extends Component {
  static defaultProps = {
    collapsed: false,
  };
  static propTypes = {
    collapsed: PropTypes.bool,
  };
  state = {
    mode: 'inline',
    theme: 'light',
    selectedKey: '',
  };

  componentWillReceiveProps(nextProps) {
    this.onCollapse(nextProps.collapsed);
  }

  onCollapse = collapsed => {
    this.setState({
      mode: collapsed ? 'vertical' : 'inline',
    });
  };
  menuClick = e => {
    this.setState({
      selectedKey: e.key,
    });
  };
  changeTheme = value => {
    this.setState({
      theme: value ? 'dark' : 'light',
    });
  };

  render() {
    return (
      <Sider
        width={225}
        styleName="sider"
        trigger={null}
        breakpoint="lg" //触发响应式布局的断点
        collapsed={this.props.collapsed}
        style={{ overflowY: 'auto' }}
      >
        <div styleName={'logo'}>
          <img alt={'智障障碍者职业适应能力检核系统'} src={logoImg} />
          <span>{'障碍者职业能力检核'}</span>
        </div>
        <Menu
          styleName="menu"
          theme={'dark'}
          mode={this.state.mode}
          onClick={this.menuClick}
          selectedKeys={[this.state.selectedKey]}
        >
          <Menu.Item key={'menu.trainees'}>
            <Link to={'/trainees'}>
              <Icon type="user" />
              <span>学生管理</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="menu.occupations">
            <Link to={'/occupations'}>
              <Icon type="bank" />
              <span>职业能力管理</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="menu.assessment">
            <Link to={'/assessment'}>
              <Icon type="scan" />
              <span>适应能力检核</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="menu.assessResult">
            <Link to={'/assessResult'}>
              <Icon type="search" />
              <span>检核结果查询</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="menu.occupationAnalyze">
            <Link to={'/occupationAnalyze'}>
              <Icon type="solution" />
              <span>职业能力分析</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="menu.assessConstrast">
            <Link to={'/assessConstrast'}>
              <Icon type="schedule" />
              <span>对照记录查询</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="menu.assessReport">
            <Link to={'/assessReport'}>
              <Icon type="solution" />
              <span>评估报告</span>
            </Link>
          </Menu.Item>
        </Menu>
      </Sider>
    );
  }
}

export default CSSModules(NavSider, styles);
