import React, { useState, useEffect, useContext } from 'react';
import { HabitContext } from '../../context/HabitContext';
import { Line, Doughnut } from 'react-chartjs-2';
import dayjs from 'dayjs';
import HabitsService from '../../service/habits-service';
import HabitRecordsService from '../../service/habit-record-service';
import './HabitProgressPage.css';

const HabitProgressPage = (props) => {

    const [chartData, setChartData] = useState({});
    const [chartDoughnutData, setChartDoughnutData] = useState({});
    const [currHabitStrength, setCurrHabitStrength] = useState(0);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [numTimes, setNumTimes] = useState(1);
    const [timeInterval, setTimeInterval] = useState('week');

    const context = useContext(HabitContext);
    const { habits, habitRecords, setHabitRecords,
        habitId, setHabitId, setGapArray } = context;

    const habit_id = +props.match.params.habit_id;
    // console.log('id', habit_id)
    setHabitId(+props.match.params.habit_id);

    // const habit = habits && habits.find(habit => {
    //     return habit.id === +id
    // });
    // const habitName = habit && habit.name;
    // const habitDescription = habit && habit.description;

    // this is just making dummy data for graph
    let labels = [];
    let data = [];
    let dataPoint = 0;
    let increment = 5;

    useEffect(() => {
        const getHabit = async () => {
            const resHabit = await HabitsService
                .getHabitById(habit_id)

            // console.log('resHabit', resHabit)

            await setName(resHabit.name);
            await setDescription(resHabit.description);
            await setNumTimes(resHabit.num_times);
            await setTimeInterval(resHabit.time_interval);
        }

        getHabit()

        const getRecords = async () => {

            const resHabitRecords = await HabitRecordsService
                .getHabitRecords();
            console.log('resHabitRecords', resHabitRecords)

            await setHabitRecords(resHabitRecords)
        }

        // if habit records empty, fetch them
        if (habitRecords.length === 0) {
            // console.log('habitRecords.length', habitRecords.length)

            getRecords()
        }
        chart()
        doughnutChart()
        setGapArray(gapArr)



    }, [habitRecords]);


    let arr = habitRecords.filter(record => record.habit_id === habit_id)
        .map(record => record.date_completed)
    arr.sort((a, b) => dayjs(a) - dayjs(b))
    console.log('arr', arr)

    const interval = dayjs().diff(dayjs(arr[0]), 'days') + 2;

    // make array of dates with null or 0 if no date
    const endDate = dayjs().format()
    const startDate = dayjs(endDate).subtract(interval, 'days').format()
    let currDay = startDate;

    let gapArr = [{
        id: habit_id,
        datesWithGaps: []
    }];
    console.log('gapArr', gapArr)

    let i = 0;

    while (dayjs(currDay).diff(dayjs(endDate), 'day') <= 0) {
        if (arr[i] === undefined) {
            arr[i] = null
        }

        console.log('arr[i]', arr[i])
        if (dayjs(currDay).isSame(dayjs(arr[i]), 'day')) {
            // console.log('currDay', currDay)

            gapArr[0]
                .datesWithGaps
                .push(currDay)
            // console.log('gapArr', gapArr)
            i++
        } else {
            gapArr[0]
                .datesWithGaps
                .push(0)
            // i++;
        }
        currDay = dayjs(currDay).add(1, 'day')
        // i++;
    }

    console.log('gapArr', gapArr)



    for (let i = 0; i < interval + 1; i++) {
        labels.push(dayjs().subtract(i, 'days').format('MMM DD'))
        // console.log('gapArr[0].datesWithGaps', gapArr[0].datesWithGaps)
        if (gapArr[0].datesWithGaps[i] !== 0) {
            increment = 5
        } else {
            increment = -5
        }
        dataPoint += increment
        // console.log('dataPoint', dataPoint)
        if (dataPoint < 0) dataPoint = 0
        if (dataPoint > 100) dataPoint = 100
        data.push(dataPoint)

        // console.log('i', i)
        // console.log('dataPoint', dataPoint)
    }

    const chart = () => {
        setChartData({
            labels: labels.reverse(),
            datasets: [
                {
                    label: 'habit strength',
                    data: data,
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                    },
                    backgroundColor: [
                        '#FF863188'
                    ],
                    borderWidth: 4
                }
            ]
        })
    }




    const doughnutChart = () => {
        setCurrHabitStrength(dataPoint)
        setChartDoughnutData({
            labels: ['Habit Strength'],
            datasets: [
                {
                    label: ['habit strength'],
                    data: [dataPoint, 100 - dataPoint],
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                    },
                    backgroundColor: [
                        '#FF863188'
                    ],
                    borderWidth: 4
                }
            ]
        })
    }

    return (

        <section className="habit-data-container">
            <h3 className="habit-name">
                {name}
            </h3>
            <p className="habit-description">
                {description}
            </p>

            <div className="habit-strength-wrapper">
                <div className="habit-strength-score card">
                    <p className="habit-indicator">Your Habit Strength is currently </p>
                    <p className="habit-percentage">
                        {currHabitStrength} % </p>
                </div>
                <div className="habit-strength card">
                    <Doughnut className="line-chart" data={chartDoughnutData}
                        options={{
                            responsive: true,
                            // maintainAspectRatio: false,

                        }} />
                </div>
            </div>

            <div className='graph-container bottom-card'>
                {/* todo: can i only do pixels for width? */}
                {/* lets try putting something in a useEffect and only render
                when gets proper value */}
                {/* const mystyle = {
      color: "white",
      backgroundColor: "DodgerBlue",
      padding: "10px",
      fontFamily: "Arial"
    }; */}
                <div className="graph-wrapper" style={{ width: 2000 }} >
                    {/* something along these lines, but interval starts off small 
                    before getting correct value.
                    maybe should re render when have correct val for interval */}
                    {/* <div className="graph-wrapper" style={{width:interval*3}} > */}
                    {/* {console.log('interval*3', interval*3)} */}

                    <Line className="line-chart" data={chartData} options={{
                        responsive: true,
                        maintainAspectRatio: false,
                    }} />
                </div>
            </div>
        </section>


    )
}

export default HabitProgressPage;