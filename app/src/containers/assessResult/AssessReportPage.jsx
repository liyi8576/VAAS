import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class AssessReportPage extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {}

  render() {
    return <div />;
  }
}

AssessReportPage.PropTypes = {};
AssessReportPage.defaultProps = {};
const mapStateToProps = state => {
  return {};
};
const mapDispatchToProps = dispatch => ({});
export default connect(mapStateToProps, mapDispatchToProps)(AssessReportPage);
