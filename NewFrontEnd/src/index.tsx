import React from 'react';
import ReactDOM from 'react-dom';
import './assets/sass/main.scss';
import App from './App';
import { CookiesProvider } from 'react-cookie';
import { store } from './redux/store';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    <CookiesProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </CookiesProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();
