import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import AssessConstrast from 'components/assessResult/AssessConstrast';
import {
  loadConstrastResult,
  resetConstrastResult,
  converConstrastResult,
} from 'reducers/AssessResult';
import { loadAbilities } from 'reducers/ability/Ability';
import { loadOccupations } from 'reducers/occupation/OccupationList';
import { loadTrainees } from 'reducers/trainee/TraineeList';

class AssessConstrastPage extends Component {
  constructor(props) {
    super();
  }
  componentDidMount() {
    this.props.loadAbilities();
    this.props.loadOccupations();
    this.props.loadTrainees();
  }

  queryConstrastResult = (traineeId, occupationId) => {
    if (!traineeId || !occupationId) {
      this.props.resetConstrastResult();
    } else {
      this.props.loadConstrastResult(traineeId, occupationId);
    }
  };
  render() {
    return (
      <AssessConstrast
        constrastResult={this.props.loading ? [] : this.props.constrastResult}
        loading={this.props.loading}
        occupationList={this.props.occupationList}
        traineeList={this.props.traineeList}
        onQuery={this.queryConstrastResult}
      />
    );
  }
}

AssessConstrastPage.PropTypes = {};
AssessConstrastPage.defaultProps = {};
const mapStateToProps = state => {
  const { isLoading } = state.assessResult || {};
  const { occupationList } = state.occupation;
  const { traineeList } = state.trainee;
  const loading = isLoading === true;
  return {
    constrastResult: converConstrastResult(state),
    occupationList: occupationList && occupationList.occupationList,
    traineeList: traineeList && traineeList.traineeList,
    loading: loading,
  };
};
const mapDispatchToProps = dispatch => ({
  loadAbilities: bindActionCreators(loadAbilities, dispatch),
  loadOccupations: bindActionCreators(loadOccupations, dispatch),
  loadTrainees: bindActionCreators(loadTrainees, dispatch),
  loadConstrastResult: bindActionCreators(loadConstrastResult, dispatch),
  resetConstrastResult: bindActionCreators(resetConstrastResult, dispatch),
});
export default connect(mapStateToProps, mapDispatchToProps)(AssessConstrastPage);
