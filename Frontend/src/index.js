/* eslint-disable no-undef */
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from "react-redux";
import App from './App';
import store from "./common_store/store/index";
import registerServiceWorker from './registerServiceWorker';

// render App component on the root element
// eslint-disable-next-line react/jsx-filename-extension
ReactDOM.render(<Provider store={store}><App /></Provider>, 
    document.getElementById('root'));
registerServiceWorker();
