import React, { Component } from 'react';
import AssessResult from 'components/assessResult/AssessResult';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import {
  loadAssessResult,
  calcLifeIndi,
  converAssessResult,
} from 'reducers/AssessResult';

class AssessResultPage extends Component {
  constructor(props) {
    super();
  }
  componentDidMount() {
    const traineeId = this.props.match.params.traineeId;
    this.props.loadAssessResult(traineeId);
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
AssessResultPage.defaultProps = {};
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
