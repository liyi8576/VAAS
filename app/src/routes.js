import React from 'react';
import {Route, Switch } from 'react-router-dom';
import App from './App';
import Trainee from './components/trainee';
import TraineeInfo from './components/trainee/TraineeInfo';
import TraineesCreate from './components/trainee/steps';
import Occupation from './components/occupation';
import OccupationInfo from './components/occupation/OccupationInfo';
import OccupationCreate from './components/occupation/steps';

export default (
  <Route
    path="/"
    component={props =>
      <App>
        <Switch>
          <Route exact path="/trainees" component={Trainee} />
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
);
