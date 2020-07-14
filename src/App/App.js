import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
const isBetween = require('dayjs/plugin/isBetween')
dayjs.extend(isBetween)
const utc = require('dayjs/plugin/utc')
dayjs.extend(utc)


function App() {
  const dayjs1020 = dayjs('2010-10-20').isBetween('2009-10-19', dayjs('2011-10-25'), 'year')
  const dayjs1030 = dayjs('2016-10-01').isBetween('2016-10-01', '2016-10-30', null, '[)')
  console.log('dayjs1020', dayjs1020)
  console.log('dayjs1030', dayjs1030)
  const dayjsUTC = dayjs().utc().format()
  console.log('dayjsUTC', dayjsUTC)
  console.log('dayjs(\'2018-04-04T16:00:00.000Z\')', dayjs('2018-04-04T16:00:00.000Z'))
  
  const dayjsAttempt = () => {
    const dateObj = new Date()
    const dateObjToString = dateObj.toString()
    const dayjsDateLocal = dayjs().format('MMM DD h:mm a')
    console.log('dayjsDateLocal', dayjsDateLocal)
    return dayjsDateLocal
    
  }

  return (
    <main className='App'>

      <h6>
        {dayjsAttempt()}
      </h6>
    
    </main>
  );
}

export default App;