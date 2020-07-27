import React, { useState, useEffect, useContext } from 'react';
import { Route } from 'react-router-dom'
import dayjs from 'dayjs';
import { HabitContextProvider, HabitContext } from '../context/HabitContext';
import dummyData from '../dummyData';
import HabitCardList from '../HabitCardList/HabitCardList'
import LandingPage from '../LandingPage/LandingPage';
import HabitCard from '../HabitCard/HabitCard';
import HabitProgressPage from '../HabitProgressPage/HabitProgressPage';
import MainNav from '../MainNav/MainNav';
import AddHabit from '../AddHabit/AddHabit';
import EditHabit from '../EditHabit/EditHabit';

const isBetween = require('dayjs/plugin/isBetween')
dayjs.extend(isBetween)
const utc = require('dayjs/plugin/utc')
dayjs.extend(utc);

const App = () => {

  const dayjsUTC = dayjs().utc().format()

  useEffect(() => {
    console.log('useEffect ran')


  }, [])


  return (
    <main className='App'>
      <Route
        path={'/'}
        component={MainNav}
      />
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
        path={'/edit-habit'}
        component={EditHabit}
      />

    </main>

  )

}

export default App;









// const randNum = Math.floor(Math.random() * 100000);

//     const user = {
//       "name": "utcguy",
//       "email": `testuser${randNum}@gmail.com`,
//       "password": "Password1!",
//       "date_created": dayjsUTC
//     }
//     console.log('user', user)

//     async function postUser(user) {
//       const url = `http://localhost:8000/api/users`

//       try {
//         const res = await fetch(url, {
//           method: "POST",
//           headers: {
//             "content-type": "application/json"
//           },
//           body: JSON.stringify(user)
//         })
//         const postedUser = await res.json();
//         console.log('postedUser.date_created', postedUser.date_created)

//         const localDateDayjs = dayjs(postedUser.date_created)
//         const localDateDayjsFromJSDate = dayjs(postedUser.date_created).format('MMM DD h:mm a')

//         console.log('localDateDayjs', localDateDayjs)
//         console.log('localDateDayjsFromJSDate', localDateDayjsFromJSDate)
//       } catch (err) {

//       };
//     };

//     postUser(user)