import React, { useState, useEffect, useContext, useRef, useLayoutEffect } from 'react';
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
    const graphContainerRef = useRef(null);

    // scroll to the rightmost edge of the graph once it has rendered
    useLayoutEffect(() => {
        console.log(`HabitProgressPage -> graphContainerRef`, graphContainerRef)
        if(graphContainerRef && graphContainerRef.current){
            const domElement = graphContainerRef.current
            domElement.scrollLeft= domElement.scrollWidth;
        }
    })

    const context = useContext(HabitContext);
    const { habitRecords, setHabitRecords,
        setHabitId } = context;

    const habit_id = +props.match.params.habit_id;
    setHabitId(+props.match.params.habit_id);

    useEffect(() => {

        const getHabit = async () => {
            const resHabit = await HabitsService
                .getHabitById(habit_id)

            setName(resHabit.name);
            setDescription(resHabit.description);
            setNumTimes(resHabit.num_times);
            setTimeInterval(resHabit.time_interval);
        }

        getHabit()

        const getRecords = async () => {

            const resHabitRecords = await HabitRecordsService
                .getHabitRecords();

            setHabitRecords(resHabitRecords)
        }

        // if habit records empty, fetch them
        if (habitRecords.length === 0) {
            getRecords()
        }

        chart()
        doughnutChart()
        // setfilledRecordsay(filledRecords)

    },
        [
            habitRecords
        ]
    );

    const dataForChart = () => {

        let labels = [];
        let data = [];
        let currDataPoint = 0;
        let increment = 5;

        // sorted array of correct habit records
        let arr = habitRecords.filter(record =>
            record.habit_id === habit_id)
            .map(record => record.date_completed);
        arr.sort((a, b) => dayjs(a) - dayjs(b));

        // length of graph x axis
        const interval = Math.max(dayjs().diff(dayjs(arr[0]), 'days') + 2, 30)

        // make array of dates with null or 0 if no date
        const endDate = dayjs().format();
        const startDate = dayjs(endDate).subtract(interval, 'days').format();
        let currDay = startDate;

        let filledRecords = [{
            id: habit_id,
            datesWithGaps: []
        }];

        let i = 0;

        // make array of dates where 0 represents
        // a non-completion day ie [7/1/20, 0, 0, 7/4/20]
        while (dayjs(currDay).diff(dayjs(endDate), 'day') <= 0) {
            if (arr[i] === undefined) {
                arr[i] = null
            }

            if (dayjs(currDay).isSame(dayjs(arr[i]), 'day')) {
                filledRecords[0].datesWithGaps
                    .push(currDay)
                i++;
            } else {
                filledRecords[0].datesWithGaps
                    .push(0)
            }
            currDay = dayjs(currDay).add(1, 'day')
        }

        // creates labels and data arrays
        for (let i = 0; i < interval + 1; i++) {
            labels.push(dayjs().subtract(i, 'days')
                .format('MMM DD'))
            if (filledRecords[0].datesWithGaps[i] !== 0) {
                increment = 5
            } else {
                increment = -5
            }
            currDataPoint += increment;
            if (currDataPoint < 0) currDataPoint = 0;
            if (currDataPoint > 100) currDataPoint = 100;
            data.push(currDataPoint);
        }

        return {
            labels,
            data,
            currDataPoint,
            interval
        }
    }

    const chart = () => {
        const { data, labels } = dataForChart();
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
        const { currDataPoint } = dataForChart();

        setCurrHabitStrength(currDataPoint);
        setChartDoughnutData({
            labels: ['Habit Strength'],
            datasets: [
                {
                    label: ['habit strength'],
                    data: [currDataPoint, 100 - currDataPoint],
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

    const graphLength = () => {
        const { interval } = dataForChart();

        const graphLen = interval * 25;
        return graphLen;
    }

    const graphWrapperStyle = {
        width: graphLength(),
        height: "35vh"
    };

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

            <div ref={graphContainerRef} className='graph-container bottom-card'>
                {/* need graph to default to being scrolled all the way right */}
                {/* need y axis to be fixed to left side */}
                {/* need to implement select options for week and month view */}
                <div className="graph-wrapper" style={graphWrapperStyle} >
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