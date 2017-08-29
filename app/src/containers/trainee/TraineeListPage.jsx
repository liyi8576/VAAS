/**
 * @Author:      liyi
 * @DateTime:    2017-08-10
 * @description: 学生管理 / 学生列表页面
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Modal } from 'antd';
import TraineeList from 'components/trainee/TraineeList';
import TraineeInfoPage from './TraineeInfoPage';
import TraineeCreatePage from './TraineeCreatePage';

import { traineeListActions, loadTrainees } from 'reducers/trainee/TraineeList';

class TraineeListPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchCond: {},
      pagination: { pageSize: 10, total: 0, current: 1 },
      selectItem: null,
      triggerAction: null,
    };
    this.closeModal=this.closeModal.bind(this);
  }
  // 初始化加载表格数据
  componentDidMount() {
    this.fetchTraineeList();
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
      () => this.fetchTraineeList(),
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
      () => this.fetchTraineeList(),
    );
  };
  onActionTrigger = (actionType, record) => {
    if (actionType === 'DELETE') {
      Modal.confirm({
        title: '您确定要删除学生 [ ' + record.name + ' ] 么？',
        onOk() {},
      });
    }
    this.setState({
      triggerAction: actionType,
      selectItem: record && record.id,
    });
  };
  closeModal = () => {
    this.setState({
      triggerAction: null,
    });
  };
  buildModal = (width, modalTitle, contentComp) =>
    <Modal
      width={width}
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
        return this.buildModal(800, '新增学生信息', <TraineeCreatePage onCancel={this.closeModal}/>);
      case 'MODIFY':
        return this.buildModal(
          800,
          '修改学生信息',
          <TraineeCreatePage traineeId={this.state.selectItem} onCancel={this.closeModal}/>,
        );
      case 'VIEW':
        return this.buildModal(
          800,
          '查看学生信息',
          <TraineeInfoPage traineeId={this.state.selectItem} />,
        );
      case 'SHOW_RECOMMEND':
        return this.buildModal(800, '查看学生职业推荐列表', this.state.selectItem, null);
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
const mapStateToProps = state => ({
  traineeList: state.trainee.traineeList,
});
const mapDispatchToProps = dispatch => ({
  loadTrainees: bindActionCreators(loadTrainees, dispatch),
  resetTraineeList: bindActionCreators(
    traineeListActions.resetTraineeList,
    dispatch,
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(TraineeListPage);
