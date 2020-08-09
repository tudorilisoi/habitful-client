import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App/App';
import { BrowserRouter } from 'react-router-dom';
import 'normalize.css';
import './index.css';
import { HabitContextProvider } from './context/HabitContext';
// import './fonts/HKGrotesk-Light.otf';
// import './fonts/HKGrotesk-Medium.otf';
// import './fonts/HKGrotesk-Bold.otf';

ReactDOM.render(
  <HabitContextProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </HabitContextProvider>
  , document.getElementById('root'));