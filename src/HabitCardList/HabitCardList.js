import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';
import config from '../config';
import dummyData from '../dummyData';
import HabitCard from '../HabitCard/HabitCard';
import { HabitContext } from '../context/HabitContext';
import { getNodeText } from '@testing-library/react';

const HabitCardList = (props) => {
    const context = useContext(HabitContext)

    const { habits, setHabits } = context;



    // const habits = dummyData.habits;


    useEffect(() => {
        console.log('useEffect ran')
        const getHabits = async () => {
            try {
                const url = `${config.API_ENDPOINT}/habits`
                const res = await axios.get(url)
                const resHabits = res.data;
                console.log('resHabits', resHabits)
                setHabits(resHabits);
            } catch (err) {
                console.log('err', err)
            }
        }
        getHabits()

        // todo: understand why: 
        // 1.) i get infinite loop when, no dependency array,
        // empty dependency array, habits inside dependency array
        // 2.) setHabits in dependency array prevents infinite loop
        // but now when i go back to my habits from progress page,
        // it says habits.map is not a function. but works if i reload

        // habits is some how changing from  [{…}, {…}, {…}] to 
        // 'the habit name'.....
        // SOLVED: I had  setHabits(habit.name) in HabitCard for some reason
    }, [habits, setHabits])
    console.log('habits', habits)


    // debugger
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