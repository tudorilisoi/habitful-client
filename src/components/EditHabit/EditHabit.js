import React, { useContext, useState, useEffect } from 'react';
import dayjs from 'dayjs';
import './EditHabit.css';
// import TextareaAutosize from 'react-textarea-autosize';
import HabitsService from '../../service/habits-service';
import { HabitContext } from '../../context/HabitContext';
import ValidationError from '../ValidationError/ValidationError';


// todo: do a delete habit link in red like in recipe repo
function EditHabit(props) {
    // todo: make sure validation error if no name
    const context = useContext(HabitContext);
    const { habits } = context;
    // const habitId = +props.match && +props.match.params.habit_id;
    const habitId = +props.match.params.habit_id;

    const nameInitValue = habits && habits.name;

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [numTimes, setNumTimes] = useState(1);
    const [timeInterval, setTimeInterval] = useState('week');

    useEffect(() => {

        const getHabit = async () => {
            const resHabit = await HabitsService
                .getHabitById(habitId)
            setName(resHabit && resHabit.name);
            setDescription(resHabit && resHabit.description);
            setNumTimes(resHabit && resHabit.num_times);
            setTimeInterval(resHabit && resHabit.time_interval);
        }

        getHabit()

    }, []);


    function handleCancel() {
        props.history.goBack();
    }

    async function handleDelete() {
        await HabitsService.deleteHabit(habitId);
        props.history.push(`/habits`);
    }

    function validateName() {
        const habitName = name.trim();
        if (habitName.length === 0) {
            return ` *name is required `
        };
    };

    function renderIntervalOptions() {
        return ['week', 'month'].map(interval => (
            <option
                key={interval}
                id={interval}
                value={interval}
            >
                {interval}
            </option>
        ))
    };

    function renderNumTimesOptions() {
        let nums;
        if (timeInterval === 'week') {
            nums = Array.from(new Array(7), (x, i) => i + 1);
        } else if (timeInterval === 'month') {
            nums = Array.from(new Array(30), (x, i) => i + 1);
        }
        return nums && nums.map(numTimes => (
            <option
                key={numTimes}
                id={numTimes}
                value={numTimes}
            >
                {numTimes}
            </option>
        ))
    };

    async function handleSubmit(e) {
        e.preventDefault();

        const date_created = dayjs().format();
        const newHabit = {
            name: name,
            description: description,
            num_times: numTimes,
            time_interval: timeInterval,
            date_created: date_created
        };
        await HabitsService.updateHabit(newHabit, habitId);
        await HabitsService.getHabits();
        props.history.push(`/habits/${habitId}/habit-data`)
    };

    // function toggleHoverClass() {
    //     if (name.length !== 0) {
    //         return ['EditHabit__submit', 'allowHover'].join(' ')
    //     } else {
    //         return 'EditHabit__submit'

    //     };
    // };

    const handleChangeName = (e) => {
        setName(e.target.value)
        return e.target.value
    }

    const handleChangeDescription = (e) => {
        setDescription(e.target.value)
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

    return (
        <section className="edit-habit-outer-wrapper">
            <h2>Edit Habit</h2>
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
                    <ValidationError
                        // className='accent-color'
                        message={validateName()}
                        errorPosition={'relative'}
                    />
                    <br />
                    <label
                        htmlFor='habit_description'>
                        Description</label>
                    <input type='text'
                        name='habit_description'
                        id='habit_description'
                        aria-label='habit_description'
                        value={description}
                        onChange={handleChangeDescription}
                    />
                    <br />
                    <label
                        htmlFor='habit-num-times'>
                        I plan to repeat this habit </label>
                    <select
                        name='habit-num-times'
                        id='habit-num-times'
                        aria-label='habit-num-times'
                        value={numTimes}
                        onChange={handleChangeNumTimes}
                    >
                        {renderNumTimesOptions()}
                    </select>
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
                        {renderIntervalOptions()}
                    </select>
                    <button 
                    type="button"
                    onClick={handleCancel}>Cancel</button>
                    <button
                        // className={toggleHoverClass()}
                        type="submit"
                        disabled={name.length === 0}
                    >Save</button>
                    <br />
                </form>
                {/* will style this button as a red link  */}
                <button onClick={handleDelete}>Delete</button>
            </fieldset>
        </section>
    )
};

export default EditHabit