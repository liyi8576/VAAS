import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';
import AssessmentItem from 'components/assessment/AssessmentItem';

class AssessmentItemPage extends Component {
  constructor(props) {
    super();
    this.state = {
      assessOptions: [],
      assessProcess: 0,
      assessOffset: 0,
    };
  }
  componentDidMount() {}
  render() {
    const abilityOption = this.props.abilityOptions[
      Object.keys(this.props.abilityOptions)[0]
    ];
    return (
      <AssessmentItem
        abilityOption={abilityOption || {}}
        loading={this.props.loading}
      />
    );
  }
}

AssessmentItemPage.PropTypes = {
  abilityId: PropTypes.string,
};
AssessmentItemPage.defaultProps = {};
const mapStateToProps = state => {
  const { ability } = state || {};
  const loading = ability.fetch_options_loading;
  return {
    loading: _.isUndefined(loading) ? true : loading,
    abilityOptions: ability.options || {},
  };
};
const mapDispatchToProps = dispatch => ({});
export default connect(mapStateToProps, mapDispatchToProps)(AssessmentItemPage);
