import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Assessment from 'components/assessment/Assessment';
import { bindActionCreators } from 'redux';
import { loadAbilities } from 'reducers/ability/Ability';
import { loadTraineeAssess } from 'reducers/assessment/TraineeAssess';

class TraineeAssessPage extends Component {
  constructor(props) {
    super();
    this.state = {
      assessOptions: [],
      assessProcess: 0,
      assessOffset: 0,
    };
  }
  componentDidMount() {
    this.props.loadTraineeAssess();
    this.props.loadAbilities();
  }
  render() {
    return (
      <Assessment
        ability={this.props.ability}
        options={this.props.options}
        traineeAssess={this.props.traineeAssess}
      />
    );
  }
}

TraineeAssessPage.PropTypes = {};
TraineeAssessPage.defaultProps = {};
const mapStateToProps = state => {
  const { traineeAssess } = state.assessment || {};
  return {
    ability: state.ability || {},
    traineeAssess: traineeAssess && (traineeAssess.traineeAssess||{}),
  };
};
const mapDispatchToProps = dispatch => ({
  loadAbilities: bindActionCreators(loadAbilities, dispatch),
  loadTraineeAssess: bindActionCreators(loadTraineeAssess, dispatch),
});
export default connect(mapStateToProps, mapDispatchToProps)(TraineeAssessPage);
