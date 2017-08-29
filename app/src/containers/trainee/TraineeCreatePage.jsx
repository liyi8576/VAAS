/**
 * @Author:      liyi
 * @DateTime:    2017-08-10
 * @description: 学生管理 / 学生列表页面
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import TraineeCreateSteps from 'components/trainee/TraineeCreateStep';

class TraineeCreatePage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {}
  componentWillUnmount() {}
  render() {
    return <TraineeCreateSteps onCancel={this.props.onCancel}/>;
  }
}

TraineeCreatePage.PropTypes = {
  onCancel:PropTypes.func,
  trainee: PropTypes.shape({
    traineeList: PropTypes.array,
  }).isRequired,
};
TraineeCreatePage.defaultProps = {};
const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch => ({});
export default connect(mapStateToProps, mapDispatchToProps)(TraineeCreatePage);
