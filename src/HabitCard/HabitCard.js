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
    console.log('context', context)

    const numDaystoDisplay = 7;
    const todayDayOfWeek = dayjs();
    const days = []
    for (let i = numDaystoDisplay; i > 0; i--) {
        days.push(todayDayOfWeek.subtract(i, 'days')
            .format('ddd'))
    }
    days.reverse()
    console.log('days', days)

    const handleClick = (day) => {

        setHabitRecords([...habitRecords, {
            habit_id: props.id,
            date_completed: day
        }])

    }

    const handleClickName = (name) => {
        context.setHabits(props.name)
    }

    return (

        <div className="habit-card-wrapper">
            <Link to="/habits/habit-data"
                    onClick={handleClickName}
            >
                <p className="habit-name">{props.name}</p>
            </Link>
            {/* horizontal aligned select boxes to select
             day of habit completion */}
            <div className="checkmarks-container">
                {days.map(day => <p>
                    <label htmlFor={day}> {day}
                        <input onClick={() => handleClick(day)} type={"checkbox"}
                            id={day} value={day} />
                    </label>
                </p>)}
            </div>
            {/* onClick of select box triggers function
             to update date of completion records */}
        </div>
    )
}

export default HabitCard

