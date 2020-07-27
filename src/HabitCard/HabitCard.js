import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import dayjs, { isDayjs } from 'dayjs';
import './HabitCard.css';
import dummyData from '../dummyData';
import { HabitContext } from '../context/HabitContext';


const HabitCard = props => {

    const context = useContext(HabitContext)
    const { habitRecords, setHabitRecords, habitId, setHabitId, test, setTest, gapArray } = context;
    setHabitId(props.id)
    const numDaystoDisplay = 6;
    const todayDayOfWeek = dayjs();
    const days = []
    for (let i = numDaystoDisplay; i > 0; i--) {
        days.push(todayDayOfWeek.subtract(i, 'days')
            .format('ddd'))
    }
    days.push('Today')

    let temp = []
    const handleSelectDay = (day) => {

        const actualDate = dayjs()
            .subtract(numDaystoDisplay - day, 'days')
            .format()

        const id = props.id

        const idxToDelete = habitRecords.findIndex(dateObj => {

            console.log('dateObj.date_completed', dateObj.date_completed)

            return dateObj.id === props.id &&
                dayjs(dateObj.date_completed).isSame(actualDate, 'day')

        })

        // if there is an index to be deleted, delete it
        if (idxToDelete > -1) {
            // console.log('deletion happened')
            habitRecords.splice(idxToDelete, 1)
        } else {
            // otherwise, push new id / date pair object

            // temp = [...temp, {id:id,date_completed:actualDate}]

            habitRecords.push({
                id: id,
                date_completed: actualDate
            })

        }
        // console.log('habitRecords', habitRecords)

    }



    const handleClickName = (name) => {
        context.setHabits(props.name)
        context.setHabitId(props.id)
    }
    
    console.log('gapArray', gapArray)
    const isChecked = (i) => {
        // console.log('gapArray[i]', gapArray[i])
        const gapArr = gapArray.filter(a => a.id === props.id)[0] &&
            gapArray.filter(a => a.id === props.id)[0]
                .datesWithGaps[i + 1]
        if (gapArr && props.id === 1) {
            return true
        }
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
                        defaultChecked={isChecked(i)}
                    />

                </div>)}
            </div>
            {/* onClick of select box triggers function
             to update date of completion records */}
        </div >
    )
}

export default HabitCard

