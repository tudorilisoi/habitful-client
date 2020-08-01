import React, { useContext, useState, useEffect } from 'react';
import { HabitContext } from '../context/HabitContext';
// import config from '../config';
// import './EditHabit.css';
// import TextareaAutosize from 'react-textarea-autosize';
// import ValidationError from '../ValidationError/ValidationError';

function EditHabit(props) {
    const context = useContext(HabitContext);
    // const { habits } = context;
    // const habit_id = props.match.params.habitId;
    // const habit = habits.filter(habit => habit.id == habit_id)
    //     && habits.filter(habit => habit.id == habit_id)[0];
    // const category_id = habit && habit.category_id;
    // const titleInitialValue = habit && habit.title;
    // const descriptionInitialValue = habit && habit.description;
    // const ingredientsInitialValue = habit && habit.ingredients;
    // const directionsInitialValue = habit && habit.directions;

    const [name, setName] = useState('');
    const [timeInterval, setTimeInterval] = useState('');
    const [numTimes, setNumTimes] = useState('');

    // useEffect(() => { setTitle(titleInitialValue) }, [titleInitialValue]);
    // useEffect(() => { setDescription(descriptionInitialValue) }, [descriptionInitialValue]);
    // useEffect(() => { setIngredients(ingredientsInitialValue) }, [ingredientsInitialValue]);
    // useEffect(() => { setDirections(directionsInitialValue) }, [directionsInitialValue]);

    function handleCancel() {
        props.history.goBack();
    };

    // function handleSubmit(e) {
    //     e.preventDefault();
    //     patchHabit({
    //         category_id,
    //         title,
    //         description,
    //         ingredients,
    //         directions,
    //     });
    // };

    // function validateName() {
    //     const habitName = title && title.trim();
    //     if (title !== undefined) {
    //         if (habitName.length === 0) {
    //             return ` *name is required `
    //         };
    //     };
    // };

    // async function patchHabit(fields) {
    //     try {
    //         const authToken = localStorage.getItem('authToken');
    //         await fetch(`${config.API_ENDPOINT}/habits/${habit_id}`, {
    //             method: "PATCH",
    //             headers: {
    //                 "content-type": "application/json",
    //                 "authorization": `bearer ${authToken}`
    //             },
    //             body: JSON.stringify(fields)
    //         });
    //         context.handleGetHabits();
    //         props.history.goBack();
    //     } catch (err) {

    //     };
    // };

    // function toggleHoverClass() {
    //     if (title && title.length !== 0) {
    //         return ['EditHabit__edit-habit', 'allowHover'].join(' ')
    //     } else {
    //         return 'EditHabit__edit-habit'
    //     };
    // };

    // function isDisabled() {
    //     if (typeof title === 'string') {
    //         if (title.length === 0) {
    //             return true
    //         } else {
    //             return false
    //         };
    //     };
    // };

    return (
        <>
            <h2 >Edit Habit</h2>
            <form
                // onSubmit={handleSubmit}
                id='EditHabit__edit-habit'>
                <label
                    className='text-primary-color'
                    htmlFor='habit_name'>
                    Habit Name</label>
                <input
                    type='text'
                    name='name'
                    id='habit_name'
                    value={name}
                // onChange={e => setTitle(e.target.value)}
                />
                {/* <ValidationError
                                className='accent-color'
                                message={validateName()}
                                errorPosition={'relative'}
                            /> */}
                {/* <label
                    className='text-primary-color'
                    htmlFor='description'>
                    Description</label>
                <textarea
                    name='description'
                    id='description'
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                /> */}
                {/* <label
                                className='text-primary-color'
                                htmlFor='ingredients'>
                                Ingredients</label>
                            <TextareaAutosize
                                minRows={10}
                                maxRows={100}
                                name='ingredients'
                                id='ingredients'
                                value={ingredients}
                                onChange={e => setIngredients(e.target.value)}
                            /> */}
                {/* <label
                                className='text-primary-color'
                                htmlFor='directions'>
                                Instructions</label>
                            <TextareaAutosize
                                minRows={10}
                                maxRows={100}
                                name='directions'
                                id='directions'
                                value={directions}
                                onChange={e => setDirections(e.target.value)}
                            /> */}
                <br />
                <label
                    htmlFor='habit-num-times'>
                    I plan to repeat this habit </label>
                <input type='text'
                    name='habit-num-times'
                    id='habit-num-times'
                    aria-label='habit-num-times'
                    value={numTimes}
                    onChange={e => setName(e.target.value)}

                />
                     times
                     <br />
                {/* todo: consider change timeInterval to day week month 
                     options so can be consistent with postgres options  */}
                <label
                    htmlFor='habit-time-interval'>
                    per </label>
                <input type='text'
                    name='habit-time-interval'
                    id='habit-time-interval'
                    aria-label='habit-time-interval'
                    value={timeInterval}
                    onChange={e => setName(e.target.value)}

                />
                    days
                <div className='EditHabit__buttons-wrapper'>
                    <button
                        // className='edit-button allowHover'
                        type="button"
                        aria-label='Cancel'
                        onClick={handleCancel}>Cancel</button>
                    <button
                        // className={toggleHoverClass()}
                        type="submit"
                        aria-label='submit'
                    // disabled={isDisabled()}
                    >Save</button>
                </div>
            </form>

            <div className='bottom-color-area 
                       default-primary-color'>
            </div>
        </>
    )
};

export default EditHabit