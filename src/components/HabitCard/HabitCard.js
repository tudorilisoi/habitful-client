import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import dayjs, { isDayjs } from 'dayjs';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { HabitContext } from '../../context/HabitContext';
import HabitRecordsService from '../../service/habit-record-service';
import './HabitCard.css';
import HabitsService from '../../service/habits-service';

const HabitCard = props => {

    const context = useContext(HabitContext)
    const { habitRecords, setHabitRecords, habitId,
        setHabitId, test, setTest, gapArray } = context;

    const [selectedId, setSelectedId] = useState('')

    const numDaystoDisplay = 7;
    const todayDayOfWeek = dayjs();
    const daysNames = [];
    const daysNums = [];
    const actualDays = [];
    for (let i = numDaystoDisplay - 1; i > 0; i--) {
        daysNames.push(todayDayOfWeek.subtract(i, 'days')
            .format('ddd').toUpperCase())
        daysNums.push(todayDayOfWeek.subtract(i, 'days')
            .format('D'))
        actualDays.push(todayDayOfWeek.subtract(i, 'days'))
    }
    daysNames.push('Today'.toUpperCase())
    daysNums.push(todayDayOfWeek.format('D'))
    actualDays.push(todayDayOfWeek)


    const handleError = () => {
        console.log('handleError ran')

        errorToast();
    }

    const successToast = async (habit_id, dateSelected) => {
        const dateFormatted = dayjs(dateSelected).format('MMM DD');
        const resHabit = await HabitsService.getHabitById(habit_id);
        const habitName = resHabit && resHabit.name;

        if (habitName) {
            toast.success(`completed ${habitName} on ${dateFormatted}`, {
                position: toast.POSITION.BOTTOM_CENTER,
                autoClose: 2000
            })
        }
    }

    const errorToast = async () => {
        toast.error(`something went wrong, please try again`, {
            position: toast.POSITION.BOTTOM_CENTER,
            autoClose: 2000
        })
    }

    const deleteRecord = async (idx) => {
        await HabitRecordsService
            .deleteHabitRecord(habitRecords[idx].id)
    }

    const getRecords = async () => {
        console.log('getRecords ran')
        try {
            const resHabitRecords = await HabitRecordsService
                .getHabitRecords();
                if (!resHabitRecords) handleError()
            console.log('resHabitRecords', resHabitRecords)
            return resHabitRecords;
        } catch (err) {
            // handleError();
        }
    }

    const getDateSelected = (day) => {
        const dateSelected = dayjs()
            .subtract(numDaystoDisplay - 1 - day, 'days')
            .format();
        return dateSelected
    }

    const findIdxToDelete = async (habit_id, dateSelected) => {
        if (habitRecords) {
            const idxToDelete = habitRecords.findIndex(record => {
                return record.habit_id === habit_id &&
                    dayjs(record.date_completed).isSame(dateSelected, 'day');
            })
            return idxToDelete;
        }
    }

    const setHabitRecordsToContext = async () => {
        setHabitRecords(await getRecords());
    }

    const postRecord = async (dateSelected) => {
        const newHabitRecord = {
            habit_id: props.id,
            date_completed: dateSelected
        }
        try {
            const resHabitRecords = await HabitRecordsService
                .postHabitRecord(newHabitRecord);
            return resHabitRecords;
        } catch (err) {
            console.log('err', err)
            handleError();
        }
    }

    const handleClickName = (name) => {
        context.setHabitId(props.id)
    }

    const isChecked = (props_id, i) => {

        const recordExists = (props_id) => {
            if (!habitRecords) {
                return false;
            }
            // search thru habitRecords to see if the record exists
            for (let j = 0; j < habitRecords.length; j++) {
                if (habitRecords[j].habit_id === props_id
                    && dayjs(actualDays[i])
                        .isSame(dayjs(habitRecords[j].date_completed), 'day')
                ) {
                    return true;
                }
            }
        }

        if (recordExists(props_id)) {
            return true;
        }
    }

    const handleSelectDay = async (day) => {

        const dateSelected = getDateSelected(day);
        // if a user selects a date, then clicks again to unselect
        // we need to delete that date from the record

        // find out if date selected is checked
        const isAlreadyChecked = isChecked(props.id, day);

        if (isAlreadyChecked) {
            await deleteRecord(await findIdxToDelete(props.id, dateSelected));
            setHabitRecordsToContext();
        } else {
            await postRecord(dateSelected);
            setHabitRecordsToContext();
            setSelectedId(props.id);
            successToast(props.id, dateSelected);
        }
    }

    // ensures that no duplicate toasts
    const renderToastContainer = () => {
        const toastToDisplay = props.id === selectedId
            ? <ToastContainer />
            : null;

        return toastToDisplay;
    }

    function renderCheckMarkOptions() {
        return daysNames.map((day, i) =>
            (
                <div className="day-option" key={day}>
                    <label
                        htmlFor={'' + props.id + '' + i}
                        className="day-label"
                    >
                        <input onClick={() => handleSelectDay(i)} type={"checkbox"}
                            id={'' + props.id + '' + i} value={day}
                            defaultChecked={isChecked(props.id, i)}
                        />

                        <div className="day-label-info-container">
                            <p className="day-name">{day}</p>
                            <p className="day-number">{daysNums[i]}</p>
                        </div>
                    </label>
                </div>
            )
        )
    }

    return (
        <div className="habit-card-container">
            {renderToastContainer(props.id)}
            <div className="habit-card-wrapper" >
                <Link to={`/habits/${props.id}/habit-data`}
                    onClick={handleClickName}>
                    <p className="habit-card-name">{props.name}</p>
                </Link>
                <div className="checkmarks-container">
                    {renderCheckMarkOptions()}
                </div>
            </div >
        </div>
    )
}

export default HabitCard;

