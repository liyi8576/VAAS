/**
 * @Author:      liyi
 * @DateTime:    2017-08-10
 * @description: 学生管理 / 学生列表页面
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Spin, message } from 'antd';
import TraineeEditSteps from 'components/trainee/TraineeEditStep';
import {
  traineeActions,
  loadTrainee,
  createTrainee,
  modifyTrainee,
} from 'reducers/trainee/TraineeInfo';
import { getDicHelper } from 'reducers/EnumDic';

class TraineeEditPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      saveLoaing: false,
      saveError: '',
    };
  }
  componentDidMount() {
    if (this.props.editType === 'MODIFY') {
      this.props.loadTrainee(this.props.traineeId);
    }
  }
  componentWillReceiveProps(nextProps) {
    const { type, success, resName, error } = nextProps.operate || {};
    if (type) {
      this.setState({
        saveLoading: false,
        saveError: success ? null : `保存失败！错误信息:${error}`,
      });
      if (success) {
        this.props.onCancel();
        message.success(
          `成功${{ CREATE: '创建', MODIFY: '修改' }[type]}学生[${resName}]！`,
        );
      }
      this.props.resetHandleStatus();
    }
  }
  componentWillUnmount() {
    this.props.resetTraineeState();
  }
  saveTrainee = trainee => {
    this.props.editType === 'MODIFY'
      ? this.props.createTrainee(trainee)
      : this.props.modifyTrainee(trainee.id, trainee);
  };
  render_loading() {
    return (
      <div className="vas-loading-box">
        <Spin tip="学生信息加载中..." />
      </div>
    );
  }
  render_content() {
    return (
      <TraineeEditSteps
        trainee={this.props.editType === 'MODIFY' ? this.props.trainee : {}}
        dicHelper={getDicHelper(this.props.enumDics)}
        onCancel={this.props.onCancel}
        onSaveTrainee={this.saveTrainee}
        saveLoading={this.state.saveLoading}
      />
    );
  }
  render() {
    return this.props.loading ? this.render_loading() : this.render_content();
  }
}

TraineeEditPage.PropTypes = {
  editType: PropTypes.oneOf(['CREATE', 'MODIFY']),
  traineeId: PropTypes.string,
  onCancel: PropTypes.func,
};
TraineeEditPage.defaultProps = {
  editType: 'CREATE',
  onCancel: () => {},
};
const mapStateToProps = state => {
  const { traineeInfo, isLoading, operate } = state.trainee.traineeInfo || {};
  return {
    trainee: traineeInfo || {},
    enumDics: state.enumDic.enumDics,
    loading: isLoading === true,
    operate: operate || {},
  };
};
const mapDispatchToProps = dispatch => ({
  loadTrainee: bindActionCreators(loadTrainee, dispatch),
  createTrainee: bindActionCreators(createTrainee, dispatch),
  modifyTrainee: bindActionCreators(modifyTrainee, dispatch),
  resetHandleStatus: bindActionCreators(
    traineeActions.resetHandleStatus,
    dispatch,
  ),
  resetTraineeState: bindActionCreators(
    traineeActions.resetTraineeState,
    dispatch,
  ),
});
export default connect(mapStateToProps, mapDispatchToProps)(TraineeEditPage);
