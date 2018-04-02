import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { routerMiddleware } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import rootReducer from '../reducers';
import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction';

const history = createHistory();
const composeEnhancers = composeWithDevTools();
const configureStore = preloadedState =>
  createStore(rootReducer, preloadedState, composeEnhancers(applyMiddleware(thunk)));

export default configureStore;
