import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Spin } from 'antd';
import OccupationInfo from 'components/occupation/OccupationInfo';
import { loadOccupation } from 'reducers/occupation/OccupationInfo';
import { loadAbilities } from 'reducers/ability/Ability';
import 'style/App.scss';

class OccupationInfoPage extends Component {
  componentDidMount() {
    this.props.loadOccupation(this.props.occupationId);
  }
  render_loading() {
    return (
      <div className="vas-loading-box">
        <Spin tip="职业信息加载中..." />
      </div>
    );
  }
  render_content() {
    return (
      <OccupationInfo
        ability={this.props.ability}
        occupation={this.props.occupation}
      />
    );
  }
  render() {
    return this.props.loading ? this.render_loading() : this.render_content();
  }
}

OccupationInfoPage.PropTypes = {
  occupationId: PropTypes.string,
};
OccupationInfoPage.defaultProps = {};
const mapStateToProps = state => {
  const { occupationInfo, isLoading } = state.occupation.occupationInfo || {};
  return {
    ability: state.ability||{},
    occupation: occupationInfo || {},
    loading: isLoading === true,
  };
};
const mapDispatchToProps = dispatch => ({
  loadAbilities: bindActionCreators(loadAbilities, dispatch),
  loadOccupation: bindActionCreators(loadOccupation, dispatch),
});
export default connect(mapStateToProps, mapDispatchToProps)(OccupationInfoPage);
