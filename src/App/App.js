import React, { useState, useEffect, useContext } from 'react';
import { Route } from 'react-router-dom'
import dayjs from 'dayjs';
import { HabitContextProvider, HabitContext } from '../context/HabitContext';
import dummyData, { habit_records } from '../dummyData';
import HabitCardList from '../HabitCardList/HabitCardList'
import LandingPage from '../LandingPage/LandingPage';
import HabitCard from '../HabitCard/HabitCard';
import HabitProgressPage from '../HabitProgressPage/HabitProgressPage';
import MainNav from '../MainNav/MainNav';
import AddHabit from '../AddHabit/AddHabit';
import EditHabit from '../EditHabit/EditHabit';
import Login from '../Login/Login';
import SignUp from '../SignUp/SignUp';

const isBetween = require('dayjs/plugin/isBetween')
dayjs.extend(isBetween)
const utc = require('dayjs/plugin/utc')
dayjs.extend(utc);

const App = () => {



  const context = useContext(HabitContext);
  const { habitRecords, setHabitRecords } = context;


  useEffect(() => {

    const test = async () => {
      await setHabitRecords(dummyData.habit_records)

      let temp = habitRecords;
      const tempObjs = []
      const len = temp[0] && temp[0].length
      console.log('len', len)
      for (let i = 0; i < len; i++) {
        tempObjs.push(
          {
            id: 1,
            date_completed: temp[0][i]
          }
        )
      }
      console.log('temp', temp)
      console.log('tempObjs', tempObjs)
      // cant do because infinite loop
      // how to make habitRecords = tempObjs
      // setHabitRecords(tempObjs)
    }

    test()

    


  }, [habitRecords])

  // make array of objects from dates but with added id's
  

  // then set habit records

  const dayjsUTC = dayjs().utc().format()



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