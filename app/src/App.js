import React, { Component } from 'react';
import { Layout } from 'antd';
import PropTypes from 'prop-types';
import NavSider from './components/layout/NavSider';
import HeaderBanner from './components/layout/Header';
import 'style/App.scss';

const { Content, Footer } = Layout;

class App extends Component {
  state = {
    navCollapsed: false,
  };
  toggleNav = () => {
    this.setState({
      navCollapsed: !this.state.navCollapsed,
    });
  };

  render() {
    return (
      <Layout className="ant-layout-has-sider">
        <NavSider collapsed={this.state.navCollapsed} />
        <Layout>
          <HeaderBanner
            toggleNav={this.toggleNav}
            collapsed={this.state.navCollapsed}
          />
          <Content style={{ margin: '24px', overflow: 'initial' }}>
            <div
              style={{
                background: '#fff',
                //padding: '24px',
                minHeight: 'calc(100vh - 150px)',
              }}
            >
              {this.props.children}
            </div>
          </Content>
          <Footer style={{ textAlign: 'center',height:'60px',padding:"24px" }}>
            Disabled's Vocational ability assessment system ©2017
          </Footer>
        </Layout>
      </Layout>
    );
  }
}
App.PropTypes = {
  routes: PropTypes.element,
};
export default App;
