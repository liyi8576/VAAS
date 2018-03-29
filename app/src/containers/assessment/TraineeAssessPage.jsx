import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import AssessHead from 'components/assessment/assess/AssessHead';
import AssessBody from 'components/assessment/assess/AssessBody';
import { bindActionCreators } from 'redux';
import {
  loadTraineeAssess,
  handleAssessData,
  saveAssessItem,
} from 'reducers/assessment/TraineeAssess';
import { loadAbilities } from 'reducers/ability/Ability';

class TraineeAssessPage extends Component {
  constructor(props) {
    super();
  }
  componentDidMount() {
    // 获取学员检核统计结果
    this.props.loadTraineeAssess(this.getTraineeId());
    //获取所有的能力项
    this.props.loadAbilities();
  }
  saveAssessItem = (abilityId, assessOption, callback) => {
    this.props.saveAssessItem(this.getTraineeId(), abilityId, assessOption, callback);
  };
  getTraineeId() {
    let traineeId = this.props.traineeId;
    if (!traineeId) {
      traineeId = this.props.match && this.props.match.params && this.props.match.params.traineeId;
    }
    return traineeId;
  }
  render() {
    return (
      <div className={'assessment'}>
        <AssessHead assessData={this.props.assessData} traineeId={this.getTraineeId()} />
        {this.props.isLoading ? (
          <AssessBody isLoading />
        ) : (
          <AssessBody
            traineeId={this.getTraineeId()}
            abilities={this.props.abilities}
            domain={this.props.domain}
            assessResult={this.props.assessData.assessResult}
            isLoading={false}
            saving={this.props.saving}
            onSaveAssess={this.saveAssessItem}
          />
        )}
      </div>
    );
  }
}

TraineeAssessPage.PropTypes = {
  traineeId: PropTypes.string,
};
TraineeAssessPage.defaultProps = {
  loading_abilities: true,
  loading_assessResult: true,
  saving: false,
};
const mapStateToProps = state => {
  const { traineeAssess } = state.assessment || {};
  const { assessData, loading_trainAssess, saving } = traineeAssess || {};
  const { abilities, domain, loading_abilities } = state.ability || {};
  return {
    isLoading: loading_trainAssess || loading_abilities,
    saving: saving,
    assessData: handleAssessData(assessData, state),
    abilities: abilities,
    domain: domain,
  };
};
const mapDispatchToProps = dispatch => ({
  loadTraineeAssess: bindActionCreators(loadTraineeAssess, dispatch),
  loadAbilities: bindActionCreators(loadAbilities, dispatch),
  saveAssessItem: bindActionCreators(saveAssessItem, dispatch),
});
export default connect(mapStateToProps, mapDispatchToProps)(TraineeAssessPage);
