import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import appStore from './src/utils/appStore';
import App from './src/App'; 

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={appStore}>
      <App />
    </Provider>
  </React.StrictMode>
);