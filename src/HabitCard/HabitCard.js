import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import './HabitCard.css';
import dummyData from '../dummyData';
import { HabitContext } from '../context/HabitContext';


const HabitCard = props => {

    const context = useContext(HabitContext)
    const { habitRecords, setHabit_Id, setHabitRecords } = context;

    setHabit_Id(props.id)
    // console.log('context', context)

    const numDaystoDisplay = 7;
    const todayDayOfWeek = dayjs();
    // console.log('todayDayOfWeek', todayDayOfWeek)
    const days = []

    for (let i = numDaystoDisplay; i > 0; i--) {
        days.push(todayDayOfWeek.subtract(i, 'days')
            .format('ddd'))
    }
    // days.push(todayDayOfWeek.format('ddd'))
    days.push('Today')

    // console.log('days', days)

    const handleClickDay = (day) => {
        console.log('day', day)
        console.log('days[day]', days[day])


        const actualDate = dayjs()
            .subtract(numDaystoDisplay - day, 'days')
            .format()

            // actual app will send a post fetch 
            // to add a habit record. 
            // if the user unselects a date
            // the database will be searched for 
            // that date and delete it from the record
            

        setHabitRecords([...habitRecords, {
            habit_id: props.id,
            date_completed: actualDate,
            // id: 
        }])
        // setHabit_Id(1)

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
                    <br/>
                        <input onClick={() => handleClickDay(i)} type={"checkbox"}
                            id={i} value={day} />
                    
                </div>)}
            </div>
            {/* onClick of select box triggers function
             to update date of completion records */}
        </div >
    )
}

export default HabitCard

