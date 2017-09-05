import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import AssessmentList from 'components/assessment/AssessmentList';
import { loadAssessments } from 'reducers/assessment/AssessmentList';

class AssessmentListPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchCond: {},
      pagination: { pageSize: 10, total: 0, current: 1 },
      selectItem: null,
      triggerAction: null,
    };
  }
  componentDidMount() {
    this.fetchAssessments();
  }
  componentWillUnmount() {}
  // 加载表格数据
  fetchAssessments() {
    this.props.loadAssessments({
      ...this.state.searchCond,
      offset: this.state.pagination.current,
      pageSize: this.state.pagination.pageSize,
    });
  }
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
  onActionTrigger = (actionType, record) => {};
  render() {
    const {
      assessmentList,
      assessmentCount,
      isLoading,
    } = this.props.assessmentList;
    return (
      <div>
        <AssessmentList
          assessmentList={assessmentList}
          pagination={{
            current: this.state.pagination.current,
            total: assessmentCount,
          }}
          loading={isLoading}
          onChangeTable={this.onChangeTable}
          onActionTrigger={this.onActionTrigger}
        />
      </div>
    );
  }
}

AssessmentListPage.PropTypes = {
  assessmentList: PropTypes.array,
};
AssessmentListPage.defaultProps = {};
const mapStateToProps = state => {
  const { assessmentList } = state.assessment || {};
  return {
    assessmentList: assessmentList || [],
  };
};
const mapDispatchToProps = dispatch => ({
  loadAssessments:bindActionCreators(loadAssessments,dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(AssessmentListPage);
