import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Modal, message } from 'antd';
import OccupationList from 'components/occupation/OccupationList';
import { OccupationInfoPage, OccupationEditPage } from './index';

import {
  occupationListActions,
  loadOccupations,
} from 'reducers/occupation/OccupationList';
import {
  occupationActions,
  deleteOccupation,
} from 'reducers/occupation/OccupationInfo';
import { loadEnumDic } from 'reducers/EnumDic';
import { loadAbilities } from 'reducers/ability/Ability';

class OccupationListPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchCond: {},
      pagination: { pageSize: 10, total: 0, current: 1 },
      selectItem: null,
      triggerAction: null,
    };
  }
  // 初始化加载表格数据
  componentDidMount() {
    this.props.loadEnumDic();
    this.props.loadAbilities();
    this.fetchOccupationList();
  }
  componentWillReceiveProps(nextProps) {
    const { type, success, resName, error } = nextProps.operate || {};
    if (type === 'DELETE') {
      if (success) {
        this.fetchOccupationList();
        message.success(`成功删除职业[${resName}]!`);
      } else {
        message.error(`$删除职业[${resName}]失败! 错误信息：${error}`);
      }
      this.props.resetHandleStatus();
      this.props.resetOccupationState();
    }
  }
  componentWillUnmount() {
    this.props.resetOccupationList();
  }
  // 加载表格数据
  fetchOccupationList() {
    this.props.loadOccupations({
      ...this.state.searchCond,
      offset: this.state.pagination.current,
      pageSize: this.state.pagination.pageSize,
    });
  }
  // 过滤查询触发重新加载表格数据
  onSearch = (field, val) => {
    this.setState(
      {
        searchCond: { ...this.state.searchCond, [field]: val },
      },
      () => this.fetchOccupationList(),
    );
  };
  onChangeSearchTxt = (field, val) => {
    this.setState({
      searchCond: { ...this.state.searchCond, [field]: val },
    });
  };
  // 分页、排序触发重新加载表格数据
  onChangeTable = (pagination, filters, sorter) => {
    this.setState(
      {
        pagination: {
          ...this.state.pagination,
          current: pagination.current,
        },
      },
      () => this.fetchOccupationList(),
    );
  };
  onActionTrigger = (actionType, record) => {
    if (actionType === 'DELETE') {
      Modal.confirm({
        title: '您确定要删除职业 [ ' + record.name + ' ] 么？',
        confirmLoading: true,
        onOk: () => {
          this.props.deleteOccupation(record.id, record.name);
        },
      });
    } else {
      this.setState({
        triggerAction: actionType,
        selectItem: record && record.id,
      });
    }
  };
  closeModal = () => {
    this.setState({
      triggerAction: null,
    });
  };
  buildModal = (modalTitle, contentComp) =>
    <Modal
      width={800}
      visible
      onCancel={this.closeModal}
      maskClosable={false}
      footer={null}
      title={modalTitle}
    >
      {contentComp}
    </Modal>;
  renderModal() {
    switch (this.state.triggerAction) {
      case 'CREATE':
        return this.buildModal(
          '新增职业信息',
          <OccupationEditPage
            editType="CREATE"
            onCancel={this.closeModal}
            ability={this.props.ability}
          />,
        );
      case 'MODIFY':
        return this.buildModal(
          '修改职业信息',
          <OccupationEditPage
            editType="MODIFY"
            occupationId={this.state.selectItem}
            onCancel={this.closeModal}
            ability={this.props.ability}
          />,
        );
      case 'VIEW':
        return this.buildModal(
          '查看职业信息',
          <OccupationInfoPage
            occupationId={this.state.selectItem}
            ability={this.props.ability}
          />,
        );
      case 'SHOW_RECOMMEND':
        return this.buildModal('查看学生推荐列表', null);
      default:
        return null;
    }
  }
  render() {
    const {
      occupationList,
      occupationCount,
      isLoading,
    } = this.props.occupationList;
    return (
      <div>
        <OccupationList
          searchCond={this.state.searchCond}
          occupationList={occupationList}
          pagination={{
            current: this.state.pagination.current,
            total: occupationCount,
          }}
          ability={this.props.ability}
          loading={isLoading}
          onSearch={this.onSearch}
          onChangeSearchTxt={this.onChangeSearchTxt}
          onChangeTable={this.onChangeTable}
          onActionTrigger={this.onActionTrigger}
        />
        {this.renderModal()}
      </div>
    );
  }
}

OccupationListPage.PropTypes = {
  occupationId: PropTypes.string,
};
OccupationListPage.defaultProps = {};
const mapStateToProps = state => {
  const { occupationList, occupationInfo } = state.occupation;
  return {
    occupationList: occupationList || [],
    operate: occupationInfo && occupationInfo.operate,
    enumDics: state.enumDic.enumDics,
    ability: state.ability,
  };
};
const mapDispatchToProps = dispatch => ({
  loadEnumDic: bindActionCreators(loadEnumDic, dispatch),
  loadOccupations: bindActionCreators(loadOccupations, dispatch),
  loadAbilities: bindActionCreators(loadAbilities, dispatch),
  deleteOccupation: bindActionCreators(deleteOccupation, dispatch),
  resetOccupationList: bindActionCreators(
    occupationListActions.resetOccupationList,
    dispatch,
  ),
  resetHandleStatus: bindActionCreators(
    occupationActions.resetHandleStatus,
    dispatch,
  ),
  resetOccupationState: bindActionCreators(
    occupationActions.resetOccupationState,
    dispatch,
  ),
});
export default connect(mapStateToProps, mapDispatchToProps)(OccupationListPage);
