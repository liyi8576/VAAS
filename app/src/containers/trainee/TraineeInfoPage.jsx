/**
 * @Author:      liyi
 * @DateTime:    2017-08-10
 * @description: 学生管理 / 学生列表页面
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Spin } from 'antd';
import TraineeInfo from 'components/trainee/TraineeInfo';
import { loadTrainee } from 'reducers/trainee/TraineeInfo';
import { getDicHelper } from 'reducers/EnumDic';
import 'style/App.scss';

class TraineeInfoPage extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.loadTrainee(this.getTraineeId());
  }
  componentWillUnmount() {}
  getTraineeId() {
    let traineeId = this.props.traineeId;
    if (!traineeId) {
      traineeId = this.props.match && this.props.match.params && this.props.match.params.traineeId;
    }
    return traineeId;
  }
  render_loading() {
    return (
      <div className="vas-loading-box">
        <Spin tip="学生信息加载中..." />
      </div>
    );
  }
  render_content() {
    return (
      <TraineeInfo trainee={this.props.trainee} dicHelper={getDicHelper(this.props.enumDics)} />
    );
  }
  render() {
    return this.props.loading ? this.render_loading() : this.render_content();
  }
}

TraineeInfoPage.PropTypes = {
  traineeId: PropTypes.string,
};
TraineeInfoPage.defaultProps = {};
const mapStateToProps = state => {
  const { traineeInfo, isLoading } = state.trainee.traineeInfo || {};
  return {
    enumDics: state.enumDic.enumDics,
    trainee: traineeInfo || {},
    loading: isLoading === true,
  };
};
const mapDispatchToProps = dispatch => ({
  loadTrainee: bindActionCreators(loadTrainee, dispatch),
});
export default connect(mapStateToProps, mapDispatchToProps)(TraineeInfoPage);
