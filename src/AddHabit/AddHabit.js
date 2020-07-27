import React, { useContext, useState } from 'react';
// import config from '../config';

// import './AddHabit.css';
// import TextareaAutosize from 'react-textarea-autosize';
// import ValidationError from '../ValidationError/ValidationError';
import { HabitContext } from '../context/HabitContext';


function AddHabit(props) {
    const [name, setName] = useState('');
    const [timeInterval, setTimeInterval] = useState('');
    const [numTimes, setNumTimes] = useState('');

    const context = useContext(HabitContext);
    // const {  } = context;

    function handleCancel() {
        props.history.goBack();
    }

    // function validateName() {
    //     const habitName = name.trim();
    //     if (habitName.length === 0) {
    //         return ` *name is required `
    //     };
    // };

    function handleSubmit(e) {
        e.preventDefault();
        // const { select_category } = e.target;
        // postHabit({
        //     category_id: select_category.value,
        //     title: name,
        //     description,
        //     ingredients,
        //     directions,
        // });
    };

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

    // function renderOptions() {
    //     return categories.map(category => (
    //         <option
    //             key={category.id}
    //             id={category.id}
    //             value={category.id}
    //         >
    //             {category.category_name}
    //         </option>
    //     ))
    // };

    // function toggleHoverClass() {
    //     if (name.length !== 0) {
    //         return ['AddHabit__submit', 'allowHover'].join(' ')
    //     } else {
    //         return 'AddHabit__submit'

    //     };
    // };

    return (
        <section className="add-habit-outer-wrapper">
            <h2>Add Habit</h2>
            <fieldset>
                <form>
                    <label
                        htmlFor='habit_name'>
                        Habit Name</label>
                    <input type='text'
                        name='habit_name'
                        id='habit_name'
                        aria-label='habit_name'
                        value={name}
                        onChange={e => setName(e.target.value)}
                        autoFocus
                    />
                    <br/>
                    <label
                        htmlFor='habit-num-times'>
                        I plan to repeat this habit </label>
                    <input type='text'
                        name='habit-num-times'
                        id='habit-num-times'
                        aria-label='habit-num-times'
                        value={numTimes}
                        onChange={e => setName(e.target.value)}
                        autoFocus
                    />
                     times  
                     <br/>
                     <label
                        htmlFor='habit-time-interval'>
                        per </label>
                    <input type='text'
                        name='habit-time-interval'
                        id='habit-time-interval'
                        aria-label='habit-time-interval'
                        value={timeInterval}
                        onChange={e => setName(e.target.value)}
                        autoFocus
                    />
                    days





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



                </form>
                <button onClick={handleCancel}>Cancel</button>
                <button>Add</button>
            </fieldset>
        </section>
    )
};

export default AddHabit