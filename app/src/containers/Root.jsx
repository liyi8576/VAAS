import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { Route, Switch } from 'react-router-dom';
import App from '../App';
import TraineeInfo from '../components/trainee/TraineeInfo';
import TraineesCreate from '../components/trainee/TraineeEditStep';
import Occupation from '../components/occupation';
import OccupationInfo from '../components/occupation/OccupationInfo';
import OccupationCreate from '../components/occupation/steps';
import TraineeListPage from 'containers/trainee/TraineeListPage';
const Root = ({ store, history }) =>
  <Provider store={store}>
    <Router history={history}>
      <Route
        path="/"
        component={props =>
          <App>
            <Switch>
              <Route exact path="/trainees" component={TraineeListPage} />
              <Route exact path="/trainees/create" component={TraineesCreate} />
              <Route path="/trainees/:id" component={TraineeInfo} />
              <Route exact path="/occupations" component={Occupation} />
              <Route
                exact
                path="/occupations/create"
                component={OccupationCreate}
              />
              <Route exact path="/occupations/:id" component={OccupationInfo} />
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
