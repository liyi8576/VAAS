/**
 * @Author:      liyi
 * @DateTime:    2017-08-10
 * @description: 学生管理 / 学生列表页面
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Modal, message } from 'antd';
import TraineeList from 'components/trainee/TraineeList';
import TraineeInfoPage from './TraineeInfoPage';
import TraineeEditPage from './TraineeEditPage';

import { traineeListActions, loadTrainees } from 'reducers/trainee/TraineeList';
import { traineeActions, deleteTrainee } from 'reducers/trainee/TraineeInfo';
import { loadEnumDic } from 'reducers/EnumDic';

class TraineeListPage extends Component {
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
    this.fetchTraineeList();
    this.props.loadEnumDic();
  }
  componentWillReceiveProps(nextProps) {
    const { type, success, resName, error } = nextProps.operate || {};
    if (type === 'DELETE') {
      if (success) {
        this.fetchTraineeList();
        message.success(`成功删除学生[${resName}]!`);
      } else {
        message.error(`$删除学生[${resName}]失败! 错误信息：${error}`);
      }
      this.props.resetHandleStatus();
      this.props.resetTraineeState();
    }
  }
  componentWillUnmount() {
    this.props.resetTraineeList();
  }
  // 加载表格数据
  fetchTraineeList() {
    this.props.loadTrainees({
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
      () => this.fetchTraineeList()
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
      () => this.fetchTraineeList()
    );
  };
  onActionTrigger = (actionType, record) => {
    if (actionType === 'DELETE') {
      Modal.confirm({
        title: '您确定要删除学生 [ ' + record.name + ' ] 么？',
        confirmLoading: true,
        onOk: () => {
          this.props.deleteTrainee(record.id, record.name);
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
  buildModal = (modalTitle, contentComp, maskClosable = false) => (
    <Modal
      width={800}
      visible
      onCancel={this.closeModal}
      maskClosable={maskClosable}
      footer={null}
      title={modalTitle}
    >
      {contentComp}
    </Modal>
  );

  renderModal() {
    switch (this.state.triggerAction) {
      case 'CREATE':
        return this.buildModal(
          '新增学生信息',
          <TraineeEditPage editType="CREATE" onCancel={this.closeModal} />
        );
      case 'MODIFY':
        return this.buildModal(
          '修改学生信息',
          <TraineeEditPage
            editType="MODIFY"
            traineeId={this.state.selectItem}
            onCancel={this.closeModal}
          />
        );
      case 'VIEW':
        return this.buildModal(
          '查看学生信息',
          <TraineeInfoPage traineeId={this.state.selectItem} />,
          true
        );
      case 'SHOW_RECOMMEND':
        return this.buildModal('查看学生职业推荐列表', null);
      default:
        return null;
    }
  }

  render() {
    const { traineeList, traineeCount, isLoading } = this.props.traineeList;
    return (
      <div>
        <TraineeList
          searchCond={this.state.searchCond}
          traineeList={traineeList}
          pagination={{
            current: this.state.pagination.current,
            total: traineeCount,
          }}
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

TraineeListPage.PropTypes = {
  traineeList: PropTypes.shape({
    traineeList: PropTypes.array,
  }).isRequired,
};
TraineeListPage.defaultProps = {};
const mapStateToProps = state => {
  const { traineeList, traineeInfo } = state.trainee;
  return {
    traineeList: traineeList || [],
    operate: !traineeInfo ? {} : traineeInfo.operate,
    enumDics: state.enumDic.enumDics,
  };
};
const mapDispatchToProps = dispatch => ({
  loadEnumDic: bindActionCreators(loadEnumDic, dispatch),
  loadTrainees: bindActionCreators(loadTrainees, dispatch),
  deleteTrainee: bindActionCreators(deleteTrainee, dispatch),
  resetTraineeList: bindActionCreators(traineeListActions.resetTraineeList, dispatch),
  resetHandleStatus: bindActionCreators(traineeActions.resetHandleStatus, dispatch),
  resetTraineeState: bindActionCreators(traineeActions.resetTraineeState, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(TraineeListPage);
