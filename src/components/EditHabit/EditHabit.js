import React, { useContext, useState, useEffect } from 'react';
import dayjs from 'dayjs';
// import './EditHabit.css';
// import TextareaAutosize from 'react-textarea-autosize';
// import ValidationError from '../ValidationError/ValidationError';
import HabitsService from '../../service/habits-service';
import { HabitContext } from '../../context/HabitContext';


// todo: do a delete habit link in red like in recipe repo
function EditHabit(props) {
    // todo: make sure validation error if no name
    const context = useContext(HabitContext);
    const { habits } = context;
    const habitId = +props.match.params.habit_id;

    const nameInitValue = habits && habits.name;
    console.log('habits', habits)
    console.log('nameInitValue', nameInitValue)

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [numTimes, setNumTimes] = useState(1);
    const [timeInterval, setTimeInterval] = useState('week');

    useEffect(() => {

        const getHabit = async () => {
            const resHabit = await HabitsService
                .getHabitById(habitId)
            console.log('resHabit', resHabit)
            setName(resHabit && resHabit.name);
            setDescription(resHabit && resHabit.description);
            setNumTimes(resHabit && resHabit.num_times);
            setTimeInterval(resHabit && resHabit.time_interval);
            console.log('name', name)
        }

        getHabit()

    }, []);


    function handleCancel() {
        props.history.goBack();
    }

    async function handleDelete() {
        console.log('handleDelete ran')
        await HabitsService.deleteHabit(habitId);
        props.history.push(`/habits`);
    }

    // function validateName() {
    //     const habitName = name.trim();
    //     if (habitName.length === 0) {
    //         return ` *name is required `
    //     };
    // };

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
        console.log('handleSubmit ran')
        e.preventDefault();

        const date_created = dayjs().format();
        console.log('date_created', date_created)
        const newHabit = {
            name: name,
            description: description,
            num_times: numTimes,
            time_interval: timeInterval,
            date_created: date_created
        };
        await HabitsService.updateHabit(newHabit, habitId);
        await HabitsService.getHabits();
        // todo: do link to habit progress page instead
        // props.history.goBack();
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
                    <button onClick={handleCancel}>Cancel</button>
                    <button type="submit">Save</button>
                    <br /> 
                </form>
                    {/* will style this button as a red link  */}
                    {/* todo: if i put this button in form, it triggers 
                    submit which screws things up. make sure it's okay
                    to not put in form. should be since it's not part of 
                    form */}
                    <button onClick={handleDelete}>Delete</button>
            </fieldset>
        </section>
    )
};

export default EditHabit