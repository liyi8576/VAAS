import React, { Component } from 'react';
import AssessResult2 from 'components/assessResult/AssessResult2';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { loadAssessResult } from 'reducers/AssessResult';

class AssessResultPage2 extends Component {
  constructor(props) {
    super();
  }
  componentDidMount() {
    const traineeId = this.props.match.params.traineeId;
    this.props.loadAssessResult(traineeId);
  }
  render() {
    return <AssessResult2 assessResult={this.props.assessResult} loading={this.props.loading}/>;
  }
}

AssessResultPage2.PropTypes = {
  traineeId: PropTypes.string.required,
};
AssessResultPage2.defaultProps = {};
const mapStateToProps = state => {
  const { assessResult, isLoading } = state.assessResult || {};
  return {
    assessResult: assessResult,
    loading: isLoading === true,
  };
};
const mapDispatchToProps = dispatch => ({
  loadAssessResult: bindActionCreators(loadAssessResult, dispatch),
});
export default connect(mapStateToProps, mapDispatchToProps)(AssessResultPage2);
