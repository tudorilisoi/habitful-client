import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';
import config from '../config';
import HabitCard from '../HabitCard/HabitCard';
import { HabitContext } from '../context/HabitContext';
// import { getNodeText } from '@testing-library/react';

const HabitCardList = (props) => {
    const context = useContext(HabitContext)

    const { habits, setHabits, habitRecords, setHabitRecords } = context;

    useEffect(() => {
        console.log('useEffect ran')
        const getHabits = async () => {
            try {
                const url = `${config.API_ENDPOINT}/habits`
                const res = await axios.get(url)
                const resHabits = res.data;
                // console.log('resHabits', resHabits)
                setHabits(resHabits);
            } catch (err) {
                console.log('err', err)
            }
        }
        getHabits();

        const getHabitRecords = async () => {
            console.log('getHabitRecords ran')

            try {
                const url = `${config.API_ENDPOINT}/habit-records`
                const res = await axios.get(url)
                console.log('res', res)
                const resHabitRecords = res.data;
                console.log('resHabitRecords', resHabitRecords)

                console.log('habitRecords', habitRecords)
                // this causing findIndex is not a func err,
                // sort out this issue.
                setHabitRecords(...[...habitRecords, resHabitRecords]);
                console.log('habitRecords', habitRecords)


                // setHabitRecords(resHabitRecords);
            } catch (err) {
                console.log('err', err)
            }
        }
        getHabitRecords();





    }
    , [
        // habits, setHabits
        // , habitRecords , setHabitRecords
    ]
    )
    console.log('habits', habits)



    const habitCards = habits && habits.map(habit => {
        return (
            <div className="habit-card-list"
                key={habit.id}>
                <HabitCard
                    id={habit.id}
                    name={habit.name}
                />
            </div>
        )
    })

    return (
        <section className="habit-card-list-container">
            {habitCards}
        </section>
    )
}

export default HabitCardList;