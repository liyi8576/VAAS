import React, { Component } from 'react';
import { Layout } from 'antd';
import NavSider from './components/layout/NavSider';
import HeaderBanner from './components/layout/Header';
import {Route, Switch } from 'react-router-dom';
import './index.css';
import './App.css';
import Trainee from './components/trainee';
import TraineeInfo from './components/trainee/TraineeInfo';
import TraineesCreate from './components/trainee/steps';
import Occupation from './components/occupation';
import OccupationInfo from './components/occupation/OccupationInfo';
import OccupationCreate from './components/occupation/steps';

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
                padding: '24px',
                minHeight: 'calc(100vh - 150px)',
              }}
            >
              <Switch>
                <Route exact path="/trainees" component={Trainee} />
                <Route
                  exact
                  path="/trainees/create"
                  component={TraineesCreate}
                />
                <Route path="/trainees/:id" component={TraineeInfo} />
                <Route exact path="/occupations" component={Occupation} />
                <Route
                  exact
                  path="/occupations/create"
                  component={OccupationCreate}
                />
                <Route
                  exact
                  path="/occupations/:id"
                  component={OccupationInfo}
                />
              </Switch>
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            Disabled's Vocational ability assessment system ©2017 Created by
            liyi
          </Footer>
        </Layout>
      </Layout>
    );
  }
}

export default App;
