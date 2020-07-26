import React, { useState, useEffect, useContext } from 'react';
import dayjs from 'dayjs';
import dummyData from '../dummyData';
import HabitCard from '../HabitCard/HabitCard';
import {  HabitContext } from '../context/HabitContext';


const HabitCardList = (props) => {
    const context = useContext(HabitContext)
    // console.log('context', context)

    const habits = dummyData.habits;
    // const habitCards = habits.map(habit => {
    //     return (
    //         <
    //     )
    // })


    return (
        <section>

            {habits.map(habit => {
                return <div key={habit.id}>
                    <HabitCard
                        id={habit.id}
                        name={habit.name}
                    />
                </div>
            })}


        </section>
    )
}

export default HabitCardList;