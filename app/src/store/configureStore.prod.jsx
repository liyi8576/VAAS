import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';
import { routerMiddleware } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';

const history = createHistory();
const configureStore = preloadedState =>
  createStore(rootReducer, preloadedState, applyMiddleware(thunk, routerMiddleware(history)));

export default configureStore;
