import React, {Component} from 'react';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import {createLogger} from 'redux-logger';
import {Provider} from 'react-redux';
import createHistory from 'history/createBrowserHistory';
import {
  routerReducer,
  routerMiddleware,
} from 'react-router-redux';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import App from './App';
import Trainee from 'components/trainee';
import TraineeInfo from 'components/trainee/TraineeInfo';
import TraineesCreate from 'components/trainee/steps'
import Occupation from 'components/occupation';
import OccupationInfo from 'components/occupation/OccupationInfo'
import OccupationCreate from 'components/occupation/steps'



const rootReducer = combineReducers({
  routing: routerReducer,
});
const history = createHistory();
const middleware = applyMiddleware(
  thunk,
  __IS_DEV__ && createLogger({collapsed: true}),
  routerMiddleware(history),
);

let store;
if (__IS_DEV__) {
  store = createStore(rootReducer, composeWithDevTools(middleware));
} else {
  store = createStore(rootReducer, middleware);
}

class Routes extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router history="{history}">
          <Route
            path="/"
            component={props =>
              <App>
                <Switch>
                  <Route exact path="/trainees" component={Trainee}/>
                  <Route exact path="/trainees/create" component={TraineesCreate}/>
                  <Route path="/trainees/:id" component={TraineeInfo}/>
                  <Route exact path="/occupations" component={Occupation}/>
                  <Route exact path="/occupations/create" component={OccupationCreate}/>
                  <Route exact path="/occupations/:id" component={OccupationInfo}/>
                </Switch>
              </App>}
          />
        </Router>
      </Provider>
    );
  }
}

export default Routes;
