import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import AssessConstrast from 'components/assessResult/AssessConstrast';
import {
  loadConstrastResult,
  converConstrastResult,
} from 'reducers/AssessResult';
import { loadAbilities } from 'reducers/ability/Ability';

class AssessConstrastPage extends Component {
  constructor(props) {
    super();
  }
  componentDidMount() {
    this.props.loadAbilities();
    this.props.loadConstrastResult('1', '6');
  }
  render() {
    return (
      <AssessConstrast
        constrastResult={this.props.constrastResult}
        loading={this.props.loading}
      />
    );
  }
}

AssessConstrastPage.PropTypes = {};
AssessConstrastPage.defaultProps = {};
const mapStateToProps = state => {
  const { isLoading } = state.assessResult || {};
  return {
    constrastResult: converConstrastResult(state),
    loading: isLoading === true,
  };
};
const mapDispatchToProps = dispatch => ({
  loadAbilities: bindActionCreators(loadAbilities, dispatch),
  loadConstrastResult: bindActionCreators(loadConstrastResult, dispatch),
});
export default connect(mapStateToProps, mapDispatchToProps)(
  AssessConstrastPage,
);
