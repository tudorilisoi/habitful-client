import React from 'react';
import ReactDOM from 'react-dom';
import App from './App/App';
import { BrowserRouter } from 'react-router-dom';
import 'normalize.css';
import './index.css';
import { HabitContextProvider } from './context/HabitContext';
ReactDOM.render(
  <HabitContextProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </HabitContextProvider>
  , document.getElementById('root'));