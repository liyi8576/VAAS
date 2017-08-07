import React from 'react';
import ReactDOM from 'react-dom';

import { AppContainer } from 'react-hot-loader';
import registerServiceWorker from './registerServiceWorker';
import Routes from './Routes';

const render = Component =>
  ReactDOM.render(
    <AppContainer>
      <Component />
    </AppContainer>,
    document.getElementById('root'),
  );
render(Routes);

if (module.hot) {
  module.hot.accept('./Routes', () => render(require('./Routes').default));
}
registerServiceWorker();
