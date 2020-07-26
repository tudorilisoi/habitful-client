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
    const habits = dummyData.habits;
    const id = props.match.params.habit_id
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
    for (let i = 0; i < 30; i++) {
        labels.push(dayjs().subtract(i, 'days').format('MMM DD'))
        if (Math.random() > 0.2) {
            increment = 5
        } else {
            increment = -5
        }
        dataPoint += increment
        if (dataPoint < 0) dataPoint = 0
        if (dataPoint > 100) dataPoint = 100
        data.push(dataPoint)
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

    }, [])




    // get date_completion records for the given 
    // habit and then display it on a graph. For now 
    // I'll just get the data. 



    const context = useContext(HabitContext)
    console.log('context', context)
    // const { habits } = context
    // console.log('habits', habits)

    console.log('props', props)
    const records = context.habitRecords



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