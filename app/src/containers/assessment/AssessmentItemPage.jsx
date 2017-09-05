import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import AssessmentItem from 'components/assessment/AssessmentItem';
import { bindActionCreators } from 'redux';
import { loadAbilityOptions } from 'reducers/ability/Ability';

class AssessmentItemPage extends Component {
  constructor(props) {
    super();
    this.state = {
      assessOptions: [],
      assessProcess: 0,
      assessOffset: 0,
    };
  }
  componentDidMount() {
    this.props.loadAbilityOptions();
  }
  render() {
    const abilityOption = this.props.abilityOptions[
      Object.keys(this.props.abilityOptions)[0]
    ];
    return <AssessmentItem abilityOption={abilityOption || {}} />;
  }
}

AssessmentItemPage.PropTypes = {
  abilityId: PropTypes.string,
};
AssessmentItemPage.defaultProps = {};
const mapStateToProps = state => {
  return {
    abilityOptions: (state.ability || {}).options || {},
  };
};
const mapDispatchToProps = dispatch => ({
  loadAbilityOptions: bindActionCreators(loadAbilityOptions, dispatch),
});
export default connect(mapStateToProps, mapDispatchToProps)(AssessmentItemPage);
