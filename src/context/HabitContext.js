import React, { useState, createContext } from 'react';
import dummyData from '../dummyData';

export const HabitContext = createContext();

export const HabitContextProvider = props => {

    const [habits, setHabits] = useState();
    const [habitRecords, setHabitRecords] = useState([]);
    const [habitId, setHabitId] = useState(0);
    const [test,setTest] = useState([])
    const [gapArray,setGapArray] = useState([])

    return (
        <HabitContext.Provider value={{
            test,
            setTest,
            habits,
            setHabits,
            habitRecords,
            setHabitRecords,
            habitId,
            setHabitId,
            gapArray,
            setGapArray
            
        }}>
            {props.children}
        </HabitContext.Provider>
    )
}