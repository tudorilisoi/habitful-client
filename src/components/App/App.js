import React, { useState, useEffect, useContext } from 'react';
import { Route } from 'react-router-dom'
import dayjs from 'dayjs';
import HabitCardList from '../HabitCardList/HabitCardList'
import LandingPage from '../LandingPage/LandingPage';
// import HabitCard from '../HabitCard/HabitCard';
import HabitProgressPage from '../HabitProgressPage/HabitProgressPage';
import MainNav from '../MainNav/MainNav';
import AddHabit from '../AddHabit/AddHabit';
import EditHabit from '../EditHabit/EditHabit';
import Login from '../Login/Login';
import SignUp from '../SignUp/SignUp';
import { HabitContext } from '../../context/HabitContext';
import './App.css'

const isBetween = require('dayjs/plugin/isBetween')
dayjs.extend(isBetween)
const utc = require('dayjs/plugin/utc')
dayjs.extend(utc);

const App = () => {
  // console.log('App ran')

  const context = useContext(HabitContext);
  const { isLoggedIn, setIsLoggedIn } = context;

  useEffect(() => {

    const authToken = localStorage.getItem('authToken');
    const loggedInStatus = authToken ? true : false;
    setIsLoggedIn(loggedInStatus);


  }, [isLoggedIn])


  return (
    <main className='App'>
      <Route
        path={'/'}
        component={MainNav}
      />
      <section className="main-content">
        <Route
          exact
          path={'/'}
          component={LandingPage}
        />
        <Route
          exact
          path={'/habits'}
          component={HabitCardList}
        />
        <Route
          exact
          path={'/habits/:habit_id/habit-data'}
          component={HabitProgressPage}
        />
        <Route
          exact
          path={'/add-habit'}
          component={AddHabit}
        />
        <Route
          exact
          path={'/:habit_id/edit-habit'}
          component={EditHabit}
        />
        <Route
          exact
          path={'/login'}
          component={Login}
        />
        <Route
          exact
          path={'/signup'}
          component={SignUp}
        />
      </section>

    </main>

  )

}

export default App;