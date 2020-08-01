import React, { useContext, useState } from 'react';
// import config from '../config';

// import './AddHabit.css';
// import TextareaAutosize from 'react-textarea-autosize';
// import ValidationError from '../ValidationError/ValidationError';
import { HabitContext } from '../../context/HabitContext';
import HabitsService from '../../service/habits-service';


function AddHabit(props) {
    const [name, setName] = useState('');
    const [numTimes, setNumTimes] = useState('');
    const [timeInterval, setTimeInterval] = useState('day');

    const context = useContext(HabitContext);
    // const {  } = context;

    function handleCancel() {
        console.log('handleCancel ran')
        props.history.goBack();
    }

    // function validateName() {
    //     const habitName = name.trim();
    //     if (habitName.length === 0) {
    //         return ` *name is required `
    //     };
    // };


    // async function postHabit(fields) {
    //     try {
    //         const authToken = localStorage.getItem('authToken');
    //         const res = await fetch(`${config.API_ENDPOINT}/habits`, {
    //             method: "POST",
    //             headers: {
    //                 "content-type": "application/json",
    //                 "authorization": `bearer ${authToken}`
    //             },
    //             body: JSON.stringify(fields)
    //         })
    //         const postedHabit = await res.json();
    //         // switch current category id to the one the user
    //         // selected so that when they get to the habit page, 
    //         // they can click back to go to the correct category
    //         // ie the category which the new habit belongs to
    //         sessionStorage.setItem('currentCategoryId', `${postedHabit.category_id}`);
    //         context.handleGetHabits();
    //         props.history.push(`/habits/${postedHabit.id}`);
    //     } catch (err) {

    //     };
    // };

    function renderOptions() {
        return ['day', 'week', 'month'].map(interval => (
            <option
                key={interval}
                id={interval}
                value={interval}
            >
                {interval}
            </option>
        ))
    };


    function handleSubmit(e) {
        e.preventDefault();
        const newHabit = {
            name:name,
            num_times:numTimes,
            time_interval:timeInterval
        }
        HabitsService.postHabit(newHabit)
    };

    // function toggleHoverClass() {
    //     if (name.length !== 0) {
    //         return ['AddHabit__submit', 'allowHover'].join(' ')
    //     } else {
    //         return 'AddHabit__submit'

    //     };
    // };
    const handleChangeName = (e) => {
        setName(e.target.value)
        return e.target.value
    }

    const handleChangeNumTimes = (e) => {
        setNumTimes(e.target.value)
        return e.target.value
    }

    const handleChangeTimeInterval = (e) => {
        setTimeInterval(e.target.value)
        return e.target.value
    }


    // todo: add description field
    return (
        <section className="add-habit-outer-wrapper">
            <h2>Add Habit</h2>
            <fieldset>
                <form
                    onSubmit={handleSubmit}
                >
                    <label
                        htmlFor='habit_name'>
                        Habit Name</label>
                    <input type='text'
                        name='habit_name'
                        id='habit_name'
                        aria-label='habit_name'
                        value={name}
                        onChange={handleChangeName}
                        autoFocus
                    />
                    <br />
                    {/* maybe this should be a select options and 
                    have it only allow select 1 for day,
                    up to 7 for week etc */}
                    <label
                        htmlFor='habit-num-times'>
                        I plan to repeat this habit </label>
                    <input type='text'
                        name='habit-num-times'
                        id='habit-num-times'
                        aria-label='habit-num-times'
                        value={numTimes}
                        onChange={handleChangeNumTimes}
                    />
                     times
                     <br />
                    <label
                        htmlFor='habit-time-interval'>
                        per </label>
                    <select
                        name='habit-time-interval'
                        id='habit-time-interval'
                        aria-label='habit-time-interval'
                        value={timeInterval}
                        onChange={handleChangeTimeInterval}
                    >
                        {renderOptions()}
                    </select>


                    {/* <label
                        htmlFor='select_frequency'>
                        Frequency</label>
                    <select
                        className='select-frequency'
                        name='select_frequency'
                        id='select_frequency'
                        aria-label='select_frequency'>
                        {renderOptions()}

                        
                    </select> */}


                    <button onClick={handleCancel}>Cancel</button>
                    <button type="submit">Add</button>
                </form>

            </fieldset>
        </section>
    )
};

export default AddHabit