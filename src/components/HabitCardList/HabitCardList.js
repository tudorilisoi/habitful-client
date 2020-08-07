import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';
import config from '../../config';
import HabitCard from '../HabitCard/HabitCard';
import { HabitContext } from '../../context/HabitContext';
import HabitRecordsService from '../../service/habit-record-service';
import HabitsService from '../../service/habits-service';
// import { getNodeText } from '@testing-library/react';

const HabitCardList = (props) => {
    const context = useContext(HabitContext)

    const { habits, setHabits, habitRecords, setHabitRecords } = context;

    useEffect(() => {
        console.log('useEffect ran')
        updateHabitsInContext();
        updateHabitRecordsInContext();
    }, [])

    // do i need to do try catch? 
    const getHabits = async () => {
        try {
            const resHabits = await HabitsService.getHabits();
            return resHabits;
        } catch (err) {
            console.log('err', err)
        }
    }
    const updateHabitsInContext = async () => {
        const resHabits = await getHabits();
        setHabits(resHabits);
    }
    const getHabitRecords = async () => {
        const resHabitRecords = await HabitRecordsService
            .getHabitRecords();
        return resHabitRecords;
    }
    const updateHabitRecordsInContext = async () => {
        const resHabitRecords = await getHabitRecords();
        setHabitRecords(resHabitRecords);
    }

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