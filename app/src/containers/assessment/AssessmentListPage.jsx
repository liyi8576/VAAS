import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import AssessmentList from 'components/assessment/AssessmentList';
import { loadAssessments, dealAssessmentList } from 'reducers/assessment/AssessmentList';
import { loadAbilities } from 'reducers/ability/Ability';

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
    this.props.loadAbilities();
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
      () => this.fetchAssessments()
    );
  };
  onChangeTab = active => {
    const ary = active.split('TAB#');
    if (ary.length > 1) {
      this.setState({ searchCond: { assessStatus: ary[1] } }, () => this.fetchAssessments());
    }
  };
  onActionTrigger = (actionType, record) => {};
  render() {
    return (
      <div>
        <AssessmentList
          assessmentList={this.props.assessmentList}
          pagination={{
            current: this.state.pagination.current,
            total: this.props.assessmentCount,
          }}
          loading={this.props.loading}
          onChangeTable={this.onChangeTable}
          onChangeTab={this.onChangeTab}
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
  let { assessmentList } = state.assessment || {};
  assessmentList = assessmentList || {};
  return {
    assessmentList: dealAssessmentList(state),
    assessmentCount: assessmentList.assessmentCount,
    loading: assessmentList.isLoading,
  };
};
const mapDispatchToProps = dispatch => ({
  loadAssessments: bindActionCreators(loadAssessments, dispatch),
  loadAbilities: bindActionCreators(loadAbilities, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(AssessmentListPage);
