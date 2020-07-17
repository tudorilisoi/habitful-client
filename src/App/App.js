import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import localDateRecordsToCheckMarksArray from '../localDateRecordsToCheckMarksArray.js';

const isBetween = require('dayjs/plugin/isBetween')
dayjs.extend(isBetween)
const utc = require('dayjs/plugin/utc')
dayjs.extend(utc);

function App() {

  const dayjsUTC = dayjs().utc().format()
  
  // useEffect(() => {
  //   console.log('useEffect ran')

  //   const randNum = Math.floor(Math.random() * 100000);
    
  //   const user = {
  //     "name": "utcguy",
  //     "email": `testuser${randNum}@gmail.com`,
  //     "password": "Password1!",
  //     "date_created": dayjsUTC
  //   }
  //   console.log('user', user)

  //   async function postUser(user) {
  //     const url = `http://localhost:8000/api/users`
      
  //     try {
  //       const res = await fetch(url, {
  //         method: "POST",
  //         headers: {
  //           "content-type": "application/json"
  //         },
  //         body: JSON.stringify(user)
  //       })
  //       const postedUser = await res.json();
  //       console.log('postedUser.date_created', postedUser.date_created)

  //       const localDateDayjs = dayjs(postedUser.date_created)
  //       const localDateDayjsFromJSDate = dayjs(postedUser.date_created).format('MMM DD h:mm a')

  //       console.log('localDateDayjs', localDateDayjs)
  //       console.log('localDateDayjsFromJSDate', localDateDayjsFromJSDate)
  //     } catch (err) {

  //     };
  //   };

  //   postUser(user)
  // }, [])


  localDateRecordsToCheckMarksArray()

  return (
    <main className='App'>

      <h6>
        {/* {dayjsAttempt()} */}
      </h6>

    </main>
  );
}

export default App;