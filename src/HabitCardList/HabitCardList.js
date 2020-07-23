import React, { useState, useEffect, useContext } from 'react';
import dayjs from 'dayjs';
import dummyData from '../dummyData';
import HabitCard from '../HabitCard/HabitCard';

const HabitCardList = (props) => {
    const habits = dummyData.habits;
    // const habitCards = habits.map(habit => {
    //     return (
    //         <
    //     )
    // })


    return (
        <section>

            {habits.map(habit => {
                return <div>
                    <HabitCard
                        name={habit.name}
                    />
                </div>
            })}


        </section>
    )
}

export default HabitCardList;