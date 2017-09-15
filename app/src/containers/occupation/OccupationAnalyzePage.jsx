import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class OccupationAnalyzePage extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {}

  render() {
    return <div />;
  }
}

OccupationAnalyzePage.PropTypes = {};
OccupationAnalyzePage.defaultProps = {};
const mapStateToProps = state => {
  return {};
};
const mapDispatchToProps = dispatch => ({});
export default connect(mapStateToProps, mapDispatchToProps)(
  OccupationAnalyzePage,
);
