import React, { useState, useEffect, useContext } from 'react';
import { HabitContext } from '../context/HabitContext';
import { Line, Doughnut } from 'react-chartjs-2';
import dayjs from 'dayjs';
import './HabitProgressPage.css'

const HabitProgressPage = (props) => {

    const [chartData, setChartData] = useState({});
    const [chartDoughnutData, setChartDoughnutData] = useState({});

    let labels = []
    let data = []
    let dataPoint = 0

    for (let i = 0; i < 30; i++) {
        labels.push(dayjs().subtract(i, 'days').format('MMM DD'))
        // labels.reverse()
        if (Math.random() > 0.2) {
            dataPoint += 5;
            data.push(dataPoint)

        } else {
            dataPoint -= 5;
            data.push(dataPoint)
        }
        if (data[i] < 0) data[i] = 0;
        if (data[i] > 100) data[i] = 100;
    }


    console.log('props.name', props.name)
    console.log('labels', labels)
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
                        'rgba(222,12,12,0.4)'
                    ],
                    borderWidth: 4
                }
            ]
        })
    }


    const doughnutChart = () => {
        console.log('data[data.length-1]', data[data.length-1])
        setChartDoughnutData({
            labels: ['Habit Strength','minimize this gap to get to 100% Habit Strength'],

            datasets: [
                {
                    label: ['habit strength'],
                    data: [data[data.length-1],100-data[data.length-1]],
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                    },
                    backgroundColor: [
                        'rgba(222,12,12,0.4)'
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
    // const context = useContext(HabitContext);
    // const { habit_id } = context
    // console.log('habit_id', habit_id)

    // get date_completion records for the given 
    // habit and then display it on a graph. For now 
    // I'll just get the data. 



    const context = useContext(HabitContext)
    console.log('context', context)
    const { habits } = context
    console.log('habits', habits)


    const records = context.habitRecords

    return (

        <>
            <div className="habit-strength card">
                <Doughnut className="line-chart" data={chartDoughnutData}
                    options={{
                        responsive: true
                    }} />
            </div>

            <div className='graph-container card'>
                <h3>{habits}</h3>
                <div className="graph-wrapper">
                    {/* <canvas id="chart" height="400" width="15000">
                    </canvas> */}
                    {/* <div style={{height:"500px",width:"500px"}}> */}
                    <Line className="line-chart" data={chartData} options={{
                        responsive: true
                    }} />

                </div>
            </div>
        </>


    )
}

export default HabitProgressPage;