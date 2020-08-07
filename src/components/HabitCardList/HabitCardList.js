import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';
import config from '../../config';
import HabitCard from '../HabitCard/HabitCard';
import { HabitContext } from '../../context/HabitContext';
import HabitRecordsService from '../../service/habit-record-service';
// import { getNodeText } from '@testing-library/react';

const HabitCardList = (props) => {
    const context = useContext(HabitContext)

    const { habits, setHabits, habitRecords, setHabitRecords } = context;

    useEffect(() => {
        console.log('useEffect ran')
        const getHabits = async () => {
            const authToken = localStorage.getItem('authToken');
            try {
                const url = `${config.API_ENDPOINT}/habits`
                const res = await axios.get(url, {
                    method: "GET",
                    headers: {
                        "content-type": "application/json",
                        "authorization": `bearer ${authToken}`
                    },
                })
                const resHabits = res.data;
                // console.log('resHabits', resHabits)
                setHabits(resHabits);
            } catch (err) {
                console.log('err', err)
            }
        }
        getHabits();

        const getRecords = async () => {
            const resHabitRecords = await HabitRecordsService
                .getHabitRecords()
            setHabitRecords(resHabitRecords);
        }

        getRecords()


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