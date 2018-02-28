import React from 'react';
import ReactDOM from 'react-dom';

import { AppContainer } from 'react-hot-loader';
import registerServiceWorker from './registerServiceWorker';

import createHistory from 'history/createBrowserHistory';
import configureStore from './store/configureStore';
import Root from './containers/Root';

import 'api/mock';

const store = configureStore();
const history = createHistory();

if (process.env.NODE_ENV !== 'production') {
  window.React = React; // enable debugger
}

const containerDiv = document.getElementById('root');
ReactDOM.render(
  <AppContainer>
    <Root store={store} history={history} />
  </AppContainer>,
  containerDiv,
);

if (module.hot) {
  module.hot.accept('./containers/Root', () => {
    const Root = require('./containers/Root').default;
    ReactDOM.render(
      <AppContainer>
        <Root store={store} history={history} />
      </AppContainer>,
      containerDiv,
    );
  });
}
registerServiceWorker();

/**
 if (__IS_DEV__) {
  // eslint-disable-next-line no-unused-vars,react/no-deprecated
  let createClass = React.createClass;
  Object.defineProperty(React, 'createClass', {
    set: (nextCreateClass) => {
      createClass = nextCreateClass;
    },
  });
  // eslint-disable-next-line global-require
  const {whyDidYouUpdate} = require('why-did-you-update');
  whyDidYouUpdate(React);
}
 **/
