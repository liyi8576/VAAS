import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import OccupationRecommand from 'components/occupation/OccupationRecommand';
import { loadOccupations } from 'reducers/occupation/OccupationList';
import { loadRecommandList } from 'reducers/occupation/RecommandList';

class OccupationRecommandPage extends Component {
  constructor(props) {
    super();
  }
  componentDidMount() {
    this.props.loadOccupations();
  }

  queryRecommandResult = (occupationId, offset, pageSize) => {
    if (occupationId) {
      this.props.loadRecommandList(occupationId, {
        offset: offset,
        pageSize: pageSize,
      });
    }
  };
  render() {
    return (
      <OccupationRecommand
        recommandList={this.props.loading ? {} : this.props.recommandList}
        loading={this.props.loading}
        occupationId={this.props.occupationId}
        occupationList={this.props.occupationList}
        onQuery={this.queryRecommandResult}
      />
    );
  }
}

OccupationRecommandPage.PropTypes = {};
OccupationRecommandPage.defaultProps = {};
const mapStateToProps = state => {
  const { occupationList, recommandList } = state.occupation;
  return {
    recommandList: recommandList || {},
    occupationList: occupationList && occupationList.occupationList,
    loading: recommandList && recommandList.isLoading,
  };
};
const mapDispatchToProps = dispatch => ({
  loadOccupations: bindActionCreators(loadOccupations, dispatch),
  loadRecommandList: bindActionCreators(loadRecommandList, dispatch),
});
export default connect(mapStateToProps, mapDispatchToProps)(OccupationRecommandPage);
