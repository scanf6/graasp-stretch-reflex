import React from 'react';
import { I18nextProvider } from 'react-i18next';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from './reducers';
import i18nConfig from './config/i18n';
import App from './App';

const Root = () => (
  <Provider store={createStore(reducers, {})}>
    <I18nextProvider i18n={i18nConfig}>
      <App />
    </I18nextProvider>
  </Provider>
);

export default Root;
