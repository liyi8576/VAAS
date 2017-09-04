import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Assessment from 'components/assessment/Assessment';
import { bindActionCreators } from 'redux';
import { loadAbilities } from 'reducers/ability/Ability';

class AssessmentPage extends Component {
  constructor(props) {
    super();
    this.state = {
      assessOptions: [],
      assessProcess: 0,
      assessOffset: 0,
    };
  }
  componentDidMount() {
    this.props.loadAbilities();
  }
  render() {
    return <Assessment ability={this.props.ability} options={this.props.options}/>;
  }
}

AssessmentPage.PropTypes = {};
AssessmentPage.defaultProps = {};
const mapStateToProps = state => {
  return {
    ability: state.ability || {},
  }
};
const mapDispatchToProps = dispatch => ({
  loadAbilities: bindActionCreators(loadAbilities, dispatch),
});
export default connect(mapStateToProps, mapDispatchToProps)(AssessmentPage);
