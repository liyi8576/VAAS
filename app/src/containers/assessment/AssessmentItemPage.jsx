/**
 * 检核项评定选项组件
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import AssessItem from 'components/assessment/assess/AssessItem';
import _ from 'lodash';
import { bindActionCreators } from 'redux';
import { loadAbilityDetail } from 'reducers/ability/Ability';

class AssessmentItemPage extends Component {
  constructor(props) {
    super();
  }
  componentDidMount() {
    this.props.loadAbilityDetail(this.props.abilityId);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.abilityId !== this.props.abilityId) {
      this.props.loadAbilityDetail(this.props.abilityId);
    }
  }
  assessCheck = option => {
    this.props.onAssessCheck(this.props.abilityId, option);
  };
  render() {
    return (
      <AssessItem
        abilityDetail={this.props.abilityDetail}
        loading={this.props.loading}
        accessOption={this.props.accessOption}
        onChecked={this.assessCheck}
      />
    );
  }
}

AssessmentItemPage.PropTypes = {
  abilityId: PropTypes.string,
  accessOption: PropTypes.string,
  onAssessCheck: PropTypes.func,
};
AssessmentItemPage.defaultProps = {
  loading: true,
  accessOption: null,
};
const mapStateToProps = state => {
  const { ability } = state || {};
  const loading = ability.loading_abilityDetail;
  return {
    loading: _.isUndefined(loading) ? true : loading,
    abilityDetail: ability.abilityDetail || {},
  };
};
const mapDispatchToProps = dispatch => ({
  loadAbilityDetail: bindActionCreators(loadAbilityDetail, dispatch),
});
export default connect(mapStateToProps, mapDispatchToProps)(AssessmentItemPage);
