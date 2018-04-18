import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Spin, message } from 'antd';
import OccupationEditStep from 'components/occupation/OccupationEditStep';
import {
  occupationActions,
  loadOccupation,
  createOccupation,
  modifyOccupation,
} from 'reducers/occupation/OccupationInfo';
import { abilityActions, loadAbilities } from 'reducers/ability/Ability';

class OccupationEditPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      saveLoaing: false,
      saveError: '',
    };
  }
  componentDidMount() {
    this.props.loadAbilities();
    if (this.props.editType === 'MODIFY') {
      this.props.loadOccupation(this.props.occupationId);
    }
  }
  componentWillReceiveProps(nextProps) {
    const { type, success, resName, error } = nextProps.operate || {};
    if (type) {
      this.setState({
        saveLoading: false,
        saveError: success ? null : `保存失败！错误信息:${error}`,
      });
      if (success) {
        this.props.onCancel();
        message.success(
          `成功${{ CREATE: '创建', MODIFY: '修改' }[type]}职业[${resName}]！`,
        );
      }
      this.props.resetHandleStatus();
    }
  }
  componentWillUnmount() {
    this.props.resetOccupationState();
  }
  saveOccupation = occupation => {
    this.props.editType === 'MODIFY'
      ? this.props.modifyOccupation(occupation.id, occupation)
      : this.props.createOccupation(occupation) ;
  };
  render_loading() {
    return (
      <div className="vas-loading-box">
        <Spin tip="职业信息加载中..." />
      </div>
    );
  }
  render_content() {
    return (
      <OccupationEditStep
        occupation={
          this.props.editType === 'MODIFY' ? this.props.occupation : {}
        }
        onCancel={this.props.onCancel}
        ability={this.props.ability}
        onSaveOccupation={this.saveOccupation}
        saveLoading={this.state.saveLoading}
      />
    );
  }
  render() {
    return this.props.loading ? this.render_loading() : this.render_content();
  }
}

OccupationEditPage.PropTypes = {
  occupationId: PropTypes.string,
  editType: PropTypes.oneOf(['CREATE', 'MODIFY']),
  onCancel: PropTypes.func,
};
OccupationEditPage.defaultProps = {
  editType: 'CREATE',
  onCancel: () => {},
};
const mapStateToProps = state => {
  const { occupationInfo, isLoading, operate } =
    state.occupation.occupationInfo || {};
  return {
    occupation: occupationInfo || {},
    ability: state.ability || {},
    enumDics: state.enumDic.enumDics,
    loading: isLoading === true,
    operate: operate || {},
  };
};
const mapDispatchToProps = dispatch => ({
  loadOccupation: bindActionCreators(loadOccupation, dispatch),
  loadAbilities: bindActionCreators(loadAbilities, dispatch),
  createOccupation: bindActionCreators(createOccupation, dispatch),
  modifyOccupation: bindActionCreators(modifyOccupation, dispatch),
  resetHandleStatus: bindActionCreators(
    occupationActions.resetHandleStatus,
    dispatch,
  ),
  resetOccupationState: bindActionCreators(
    occupationActions.resetOccupationState,
    dispatch,
  ),
});
export default connect(mapStateToProps, mapDispatchToProps)(OccupationEditPage);
