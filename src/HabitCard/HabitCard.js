import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import './HabitCard.css';
import dummyData from '../dummyData';
import { HabitContext } from '../context/HabitContext';


const HabitCard = props => {

    const context = useContext(HabitContext)
    const { habitRecords, setHabit_Id, setHabitRecords, test, setTest } = context;

    setHabit_Id(props.id)
    // console.log('context', context)

    const numDaystoDisplay = 7;
    const todayDayOfWeek = dayjs();
    // console.log('todayDayOfWeek', todayDayOfWeek)
    const days = []
    // let deleteDateIdx

    for (let i = numDaystoDisplay; i > 0; i--) {
        days.push(todayDayOfWeek.subtract(i, 'days')
            .format('ddd'))
    }
    // days.push(todayDayOfWeek.format('ddd'))
    days.push('Today')

    // console.log('days', days)
    let temp = []
    const handleSelectDay = (day) => {
        
        console.log('day', day)
        console.log('days[day]', days[day])
        const actualDate = dayjs()
            .subtract(numDaystoDisplay - day, 'days')
            .format()

        console.log('actualDate', actualDate)

        // actual app will send a post fetch 
        // to add a habit record. 
        // if the user unselects a date
        // the database will be searched for 
        // that date and delete it from the record


        // before adding a selected date, 
        // 1. see if selected date is === to any of the dates in the array

        let deleteDateIdx = temp.findIndex(date => {
            
            console.log('sadfasd')
            // console.log('date', date)
            // if (date.id === props.id && dayjs(date.date_completed).isSame(actualDate, 'day')){
            //     console.log('date.id', date.id)
              

            // } 
        })

  


        if (deleteDateIdx > -1) {
            console.log('deleteDateIdx', deleteDateIdx)
            temp.splice(deleteDateIdx, 1)

        } else {
            temp.push({
                id: props.id,
                date_completed: actualDate
            });
        }

        console.log('temp', temp)


        // if (temp.findIndex(date => dayjs(date).isSame(actualDate, 'day')) > -1) {
        //     console.log('temp', temp)

        //     return 
        // } else {
        //     temp.push(actualDate)
        //     console.log('temp', temp)

        // }

        // 2. if it is, do not add it to array
        // 3. else, add it to array









        // setHabitRecords([...habitRecords, {
        //     habit_id: props.id,
        //     date_completed: actualDate,
        //     // id: 
        // }])






    }







    console.log('context', context)


    const handleClickName = (name) => {
        context.setHabits(props.name)
        context.setHabit_Id(props.id)
    }



    return (

        < div className="habit-card-wrapper" >
            <Link to={`/habits/${props.id}/habit-data`}
                onClick={handleClickName}>
                <p className="habit-name">{props.name}</p>
            </Link>
            <div className="checkmarks-container">
                {days.map((day, i) => <div key={day}>
                    <label htmlFor={i}> {day} </label>
                    <br />
                    <input onClick={() => handleSelectDay(i)} type={"checkbox"}
                        id={i} value={day}
                    // checked={isChecked[i]}
                    />

                </div>)}
            </div>
            {/* onClick of select box triggers function
             to update date of completion records */}
        </div >
    )
}

export default HabitCard

