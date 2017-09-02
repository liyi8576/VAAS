import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { Route, Switch } from 'react-router-dom';
import App from '../App';
import {
  TraineeListPage,
  TraineeInfoPage,
  TraineeEditPage,
} from 'containers/trainee';
import {
  OccupationListPage,
  OccupationInfoPage,
  OccupationEditPage,
} from 'containers/occupation';
import Assessment from 'components/assessment/Assessment'

const Root = ({ store, history }) =>
  <Provider store={store}>
    <Router history={history}>
      <Route
        path="/"
        component={props =>
          <App>
            <Switch>
              <Route exact path="/trainees" component={TraineeListPage} />
              <Route
                exact
                path="/trainees/create"
                component={TraineeEditPage}
              />
              <Route path="/trainees/:id" component={TraineeInfoPage} />
              <Route exact path="/occupations" component={OccupationListPage} />
              <Route
                exact
                path="/occupations/create"
                component={OccupationEditPage}
              />
              <Route
                exact
                path="/occupations/:id"
                component={OccupationInfoPage}
              />
              <Route
                exact
                path="/assessment"
                component={Assessment}
              />
            </Switch>
          </App>}
      />
    </Router>
  </Provider>;

Root.propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};
export default Root;
