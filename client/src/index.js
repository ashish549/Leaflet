
import React from 'react';
import ReactDOM from 'react-dom'; // Corrected import

import 'leaflet/dist/leaflet.css';
import 'bootstrap/dist/css/bootstrap.css';

import './index.css';
import App from './App';
// import reportWebVitals from './reportWebVitals';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
