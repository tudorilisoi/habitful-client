import React, { useState, createContext } from 'react';
import dummyData from '../dummyData';

export const HabitContext = createContext();

export const HabitContextProvider = props => {

    const [habits, setHabits] = useState([]);
    const [habitRecords, setHabitRecords] = useState([]);


    return (
        <HabitContext.Provider value={{
            habits,
            setHabits,
            habitRecords,
            setHabitRecords
        }}>
            {props.children}
        </HabitContext.Provider>
    )
}