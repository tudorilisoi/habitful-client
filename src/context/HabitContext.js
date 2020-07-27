import React, { useState, createContext } from 'react';
import dummyData from '../dummyData';

export const HabitContext = createContext();

export const HabitContextProvider = props => {

    const [habits, setHabits] = useState();
    const [habitRecords, setHabitRecords] = useState([]);
    const [habit_id, setHabit_Id] = useState(0);
    const [test,setTest] = useState([])

    return (
        <HabitContext.Provider value={{
            test,
            setTest,
            habits,
            setHabits,
            habitRecords,
            setHabitRecords,
            habit_id,
            setHabit_Id
        }}>
            {props.children}
        </HabitContext.Provider>
    )
}