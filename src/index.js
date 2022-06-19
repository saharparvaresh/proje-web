import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { ThemeProvider } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.rtl.min.css";



ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider dir="rtl">
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);


