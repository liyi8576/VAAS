import React, { Component } from 'react';
import AssessResult from 'components/assessResult/AssessResult';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { loadAssessResult, calcLifeIndi, converAssessResult } from 'reducers/AssessResult';

class AssessResultPage extends Component {
  constructor(props) {
    super();
  }
  componentDidMount() {
    this.props.loadAssessResult(this.getTraineeId());
  }
  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.loading !== this.props.loading;
  }
  getTraineeId() {
    let traineeId = this.props.traineeId;
    if (!traineeId) {
      traineeId = this.props.match && this.props.match.params && this.props.match.params.traineeId;
    }
    return traineeId;
  }
  render() {
    return (
      <AssessResult
        assessResult={this.props.assessResult}
        lifeIndi={this.props.lifeIndi}
        loading={this.props.loading}
      />
    );
  }
}

AssessResultPage.PropTypes = {
  traineeId: PropTypes.string.required,
};
AssessResultPage.defaultProps = {
  loading: true,
};
const mapStateToProps = state => {
  const { isLoading } = state.assessResult || {};
  return {
    assessResult: converAssessResult(state),
    lifeIndi: calcLifeIndi(state),
    loading: isLoading === true,
  };
};
const mapDispatchToProps = dispatch => ({
  loadAssessResult: bindActionCreators(loadAssessResult, dispatch),
});
export default connect(mapStateToProps, mapDispatchToProps)(AssessResultPage);
