import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import dayjs, { isDayjs } from 'dayjs';
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

        const actualDate = dayjs()
            .subtract(numDaystoDisplay - day, 'days')
            .format()

        const id = props.id

        console.log('actualDate', actualDate)
        console.log('id', id)

        // if id date pair already in array, delete it

        const idxToDelete = habitRecords.findIndex(dateObj => {

            console.log('dateObj.date_completed', dateObj.date_completed)
                
            return dateObj.id === props.id &&
                dayjs(dateObj.date_completed).isSame(actualDate, 'day')

        })

        console.log('idxToDelete', idxToDelete)

        // if there is an index to be deleted, delete it
        if (idxToDelete > -1) {
            console.log('deletion happened')
            habitRecords.splice(idxToDelete,1)
        } else {
        // otherwise, push new id / date pair object

            // temp = [...temp, {id:id,date_completed:actualDate}]

            habitRecords.push({
                id:id,
                date_completed:actualDate
            })
            
        }
        console.log('habitRecords', habitRecords)



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

