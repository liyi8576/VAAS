import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { Route, Switch } from 'react-router-dom';
import App from '../App';
import { TraineeListPage, TraineeInfoPage, TraineeEditPage } from 'containers/trainee';
import {
  OccupationListPage,
  OccupationInfoPage,
  OccupationEditPage,
  OccupationRecommandPage,
} from 'containers/occupation';
import { AssessmentListPage, TraineeAssessPage } from 'containers/assessment';
import { AssessResultPage, AssessConstrastPage, AssessReportPage } from 'containers/assessResult';

const Root = ({ store, history }) => (
  <Provider store={store}>
    <Router history={history}>
      <Route
        path="/"
        component={props => (
          <App>
            <Switch>
              {/**学员列表**/}
              <Route exact path="/trainees" component={TraineeListPage} />
              {/**学员管理（新建、修改）**/}
              <Route exact path="/trainees/create" component={TraineeEditPage} />
              {/**学员详细信息查看**/}
              <Route path="/trainees/:traineeId/detail" component={TraineeInfoPage} />
              {/**检核学员列表**/}
              <Route exact path="/assessment" component={AssessmentListPage} />
              {/**学员检核**/}
              <Route exact path="/trainees/:traineeId/assess" component={TraineeAssessPage} />
              {/**学员检核结果**/}
              <Route exact path="/assessResult" component={AssessResultPage} />
              <Route exact path="/trainees/:traineeId/assessResult" component={AssessResultPage} />
              {/**学员检核评估报告**/}
              <Route exact path="/assessReport" component={AssessReportPage} />
              {/**学员职业检核对照记录**/}
              <Route exact path="/assessConstrast" component={AssessConstrastPage} />
              <Route
                exact
                path="/trainees/:traineeId/occupations/:occupationId/constrast"
                component={AssessConstrastPage}
              />
              {/**职业列表**/}
              <Route exact path="/occupations" component={OccupationListPage} />
              {/**职业管理（新建、修改）**/}
              <Route exact path="/occupations/create" component={OccupationEditPage} />
              {/**职业详细信息查看**/}
              <Route exact path="/occupations/:id/detail" component={OccupationInfoPage} />
              {/**职业分析**/}
              <Route exact path="/occupationAnalyze" component={OccupationRecommandPage} />
              <Route exact path="/occupations/:id/analyze" component={OccupationRecommandPage} />
            </Switch>
          </App>
        )}
      />
    </Router>
  </Provider>
);

Root.propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};
export default Root;
