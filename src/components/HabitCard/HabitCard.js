import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import dayjs, { isDayjs } from 'dayjs';
import './HabitCard.css';
import { HabitContext } from '../../context/HabitContext';
import HabitRecordsService from '../../service/habit-record-service';

const HabitCard = props => {

    const context = useContext(HabitContext)
    const { habitRecords, setHabitRecords, habitId,
        setHabitId, test, setTest, gapArray } = context;

    const numDaystoDisplay = 7;
    const todayDayOfWeek = dayjs();
    const daysNames = [];
    const daysNums = [];
    const actualDays = [];
    for (let i = numDaystoDisplay - 1; i > 0; i--) {
        daysNames.push(todayDayOfWeek.subtract(i, 'days')
            .format('ddd'))
        daysNums.push(todayDayOfWeek.subtract(i, 'days')
            .format('D'))
        actualDays.push(todayDayOfWeek.subtract(i, 'days'))
    }
    daysNames.push('Today')
    daysNums.push(todayDayOfWeek.format('D'))
    actualDays.push(todayDayOfWeek)
    // console.log('actualDays', actualDays)

    const handleSelectDay = async (day) => {
        const dateSelected = dayjs()
            .subtract(numDaystoDisplay - 1 - day, 'days')
            .format()
        // if a user selects a date, then clicks again to unselect
        // we need to delete that date from the record
        const idxToDelete = habitRecords.findIndex(record => {
            // console.log('dayjs(record.date_completed).isSame(dateSelected, \'day\')', dayjs(record.date_completed).isSame(dateSelected, 'day'))
            return record.habit_id === props.id &&
                dayjs(record.date_completed).isSame(dateSelected, 'day')
        })
        // if there is an index to be deleted, delete it
        if (idxToDelete > -1) {
            // console.log('deletion happened')
            await HabitRecordsService
                .deleteHabitRecord(habitRecords[idxToDelete].id)


            const getRecords = async () => {
                const resHabitRecords = await HabitRecordsService
                    .getHabitRecords()
                // console.log('resHabitRecords', resHabitRecords)
                setHabitRecords(resHabitRecords);
            }

            getRecords();

        } else {
            // todo: lets do POST fetch here then set records and see
            // where things are at
            const newHabitRecord = {
                // id: **postgres will decide id
                habit_id: props.id,
                date_completed: dateSelected
            }

            const postRecord = async () => {
                const resHabitRecords = await HabitRecordsService
                    .postHabitRecord(newHabitRecord)
                // console.log('resHabitRecords', resHabitRecords)
                // setHabitRecords([resHabitRecords]);
            }

            await postRecord();

            const getRecords = async () => {
                const resHabitRecords = await HabitRecordsService
                    .getHabitRecords()
                // console.log('resHabitRecords', resHabitRecords)
                setHabitRecords(resHabitRecords);
            }

            getRecords();


        }
    }

    const handleClickName = (name) => {
        context.setHabitId(props.id)
    }

    const isChecked = (props_id, i) => {


        // const gapArr = gapArray.filter(a => a.id === props.id)[0] &&
        //     gapArray.filter(a => a.id === props.id)[0]
        //         .datesWithGaps[i + 1]
        // if (gapArr && props.id === 1) {
        //     return true
        // }

        const recordExists = (props_id) => {
            // console.log('recordExists ran')
            // search thru habitRecords to see if the record exists
            for (let j = 0; j < habitRecords.length; j++) {

                if (habitRecords[j].habit_id === props_id
                    && dayjs(actualDays[i])
                        .isSame(dayjs(habitRecords[j].date_completed), 'day')
                ) {
                    // console.log(`found ${dayjs(habitRecords[j].date_completed).format()}`)
                    return true
                }
            }
        }
        if (recordExists(props_id)) {
            return true
        }
    }



    // console.log('habitRecords', habitRecords)
    return (

        < div className="habit-card-wrapper" >
            <Link to={`/habits/${props.id}/habit-data`}
                onClick={handleClickName}>
                <p className="habit-name">{props.name}</p>
            </Link>
            <div className="checkmarks-container">
                {daysNames.map((day, i) => <div key={day}>
                    <label htmlFor={i} className="day-labels">
                        <p>{day}</p>
                        <p>{daysNums[i]}</p> </label>
                    <input onClick={() => handleSelectDay(i)} type={"checkbox"}
                        id={i} value={day}
                        defaultChecked={isChecked(props.id, i)}
                    />
                </div>)}
            </div>
        </div >
    )
}

export default HabitCard

