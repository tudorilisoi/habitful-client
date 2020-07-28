import React, { useState, useEffect, useContext } from 'react';
import { HabitContext } from '../context/HabitContext';
import { Line, Doughnut } from 'react-chartjs-2';
import dayjs from 'dayjs';
import './HabitProgressPage.css'
import dummyData from '../dummyData';

const HabitProgressPage = (props) => {

    const [chartData, setChartData] = useState({});
    const [chartDoughnutData, setChartDoughnutData] = useState({});
    const [currHabitStrength, setCurrHabitStrength] = useState(0)
    const context = useContext(HabitContext);
    const { habitRecords, setHabitRecords, setGapArray } = context;
    const habits = dummyData.habits;
    const id = +props.match.params.habit_id
    // console.log('id', id)
    habits.id = id
    const habit = habits.find(habit => {
        return habit.id === +id
    })
    const habitName = habit.name

    // this is just making dummy data for graph
    // production client will pull from database
    let labels = []
    let data = []
    let dataPoint = 0
    let increment = 5

    const interval = 7

    // make array of dates with null or 0 if no date
    const endDate = dayjs().format()
    const startDate = dayjs(endDate).subtract(interval, 'days').format()
    let correctIdArr = habitRecords.filter(record => record.id === id)
    console.log('correctIdArr', correctIdArr)
    let arr = correctIdArr.map(record => record.date_completed)
    arr.sort((a, b) => dayjs(a) - dayjs(b))

    // console.log('arr', arr)
    // let day = dayjs(startDate).subtract(1, 'day');
    let currDay = startDate;

    let gapArr = [{
        id: id,
        datesWithGaps: []
    }];

    let i = 0;

    while (dayjs(currDay).diff(dayjs(endDate), 'day') <= 0) {
        // console.log('dayjs(currDay).diff(dayjs(endDate), \'day\')', dayjs(currDay).diff(dayjs(endDate), 'day'))
        // console.log('dayjs(currDay)', dayjs(currDay))
        // console.log('dayjs(arr[i])', dayjs(arr[i]))
        // console.log('dayjs(currDay).isSame(dayjs(arr[i]),\'day\')', dayjs(currDay).isSame(dayjs(arr[i]), 'day'))
        // console.log('arr[i]', arr[i])
        if (arr[i] === undefined) {
            arr[i] = null
        }
        if (dayjs(currDay).isSame(dayjs(arr[i]), 'day')) {
            // console.log('currDay', currDay)

            gapArr.filter(a => a.id === id)[0]
                .datesWithGaps
                .push(currDay)
            // console.log('gapArr', gapArr)
            i++;
        } else {
            gapArr.filter(a => a.id === id)[0]
                .datesWithGaps
                .push(0)
        }
        currDay = dayjs(currDay).add(1, 'day')

    }

    // console.log('gapArr', gapArr)



    for (let i = 0; i < interval + 1; i++) {
        labels.push(dayjs().subtract(i, 'days').format('MMM DD'))
        // console.log('arr[i]', arr[i])
        if (gapArr.filter(a => a.id === id)[0]
            .datesWithGaps[i] !== 0) {
            increment = 5
        } else {
            increment = -5
        }
        dataPoint += increment
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


    useEffect(() => {
        chart()
        doughnutChart()
        setGapArray(gapArr)

    }, [])




    // get date_completion records for the given 
    // habit and then display it on a graph. For now 
    // I'll just get the data. 



    // const { habits } = context
    // console.log('habits', habits)

    // console.log('props', props)
    // const records = context.habitRecords



    return (

        <section className="habit-data-container">
            <h3 className="habit-name">
                {habitName}
            </h3>

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
                <div className="graph-wrapper">
                    <Line className="line-chart" data={chartData} options={{
                        responsive: true,
                        // maintainAspectRatio: false,
                    }} />
                </div>
            </div>
        </section>


    )
}

export default HabitProgressPage;