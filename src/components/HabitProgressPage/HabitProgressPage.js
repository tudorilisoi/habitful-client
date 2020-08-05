import React, { useState, useEffect, useContext, useRef, useLayoutEffect } from 'react';
import { HabitContext } from '../../context/HabitContext';
import { Line, Doughnut } from 'react-chartjs-2';
import dayjs from 'dayjs';
import HabitsService from '../../service/habits-service';
import HabitRecordsService from '../../service/habit-record-service';
import './HabitProgressPage.css';

const HabitProgressPage = (props) => {
    console.log('HabitProgressPage rendered')

    const [chartData, setChartData] = useState({});
    const [graphInterval, setGraphInterval] = useState(200);
    const [chartDoughnutData, setChartDoughnutData] = useState({});
    const [currHabitStrength, setCurrHabitStrength] = useState(0);
    const [name, setName] = useState(' ');
    const [description, setDescription] = useState('');
    // big number so forces to 0 instead of random number
    const [numTimes, setNumTimes] = useState(10000000000);
    const [timeInterval, setTimeInterval] = useState('week');
    const [graphResolution, setGraphResolution] = useState('day');
    const [graphWrapperStyle, setGraphWrapperStyle] = useState({
        width: 7000,
        height: "35vh"
    });
    const graphContainerRef = useRef(null);


    const endDate = dayjs().format();


    const context = useContext(HabitContext);
    const { habitId, setHabitId,
        habitRecords, setHabitRecords } = context;

    const habit_id = +props.match.params.habit_id;

    useEffect(() => {


        const getHabit = async () => {
            const resHabit = await HabitsService
                .getHabitById(habit_id)
            setName(resHabit.name);
            setDescription(resHabit.description);
            setNumTimes(resHabit.num_times);
            setTimeInterval(resHabit.time_interval);
            setHabitId(+props.match.params.habit_id)
        }

        getHabit()

        // split into get and set functions
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

    },
        [
            habitRecords,
            graphResolution,
            numTimes
        ]
    );


    // scroll to the rightmost edge of the graph once it has rendered
    useLayoutEffect(() => {
        // console.log(`HabitProgressPage -> graphContainerRef`, graphContainerRef)
        if (graphContainerRef && graphContainerRef.current) {

            const getGraphLength = () => {
                // console.log('getGraphLength ran')
                // todo: get this function to fill width of parent div
                // if user only has little data ( ie when they first start out)


                // console.log('graphInterval', graphInterval)
                const graphLength =
                    graphInterval * 10 / graphResolutionIncrement();
                // console.log('graphLength', graphLength)

                // let graphLen = "100vw"

                // if graphLen is small, 
                // set canvas width to window width 
                // so, Math.max(graphLen, window width)
                const domElement = graphContainerRef.current;


                // may need to track resize event
                const graphWrapperWidth = domElement.clientWidth;
                const graphLen = Math.max(graphLength, graphWrapperWidth);

                // domElement.scrollLeft = domElement.scrollWidth;
                domElement.scrollLeft = 100000;
                // console.log('domElement.scrollLeft', domElement.scrollLeft)
                // console.log('domElement.scrollWidth', domElement.scrollWidth)
                // console.log('domElement', domElement)
                // console.log('domElement.clientWidth', domElement.clientWidth)


                console.log('graphLen', graphLen)
                return graphLen;
            }

            setGraphWrapperStyle({
                // - 10 prevents unnecessary scroll bar
                width: getGraphLength() - 10,
                height: "35vh",
                position: "relative",
            })

        }

    }, [graphInterval, graphResolution])


    const dataForChart = () => {

        // sorted array of correct habit records
        let arr = habitRecords.filter(record =>
            record.habit_id === habit_id)
            .map(record => record.date_completed);
        arr.sort((a, b) => dayjs(a) - dayjs(b));

        // length of graph x axis
        const interval = Math.max(dayjs()
            .diff(dayjs(arr[0]), 'days') + 2, 30);

        setGraphInterval(interval)

        // make array of dates with null or 0 if no date
        const startDate = dayjs(endDate)
            .subtract(interval, 'days').format();
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
                arr[i] = null;
            }

            if (dayjs(currDay).isSame(dayjs(arr[i]), 'day')) {
                filledRecords[0].datesWithGaps
                    .push(currDay)
                i++;
            } else {
                filledRecords[0].datesWithGaps
                    .push(0);
            }
            currDay = dayjs(currDay).add(1, 'day');
        }

        const graphResInc = graphResolutionIncrement();
        // console.log('graphResInc', graphResInc)

        const { dailyData, currDataPoint }
            = makeDailyGraphData(filledRecords, interval);

        let labels = [];
        let data = [];

        // creates labels array
        // console.log('interval', interval)
        for (let i = interval; i >= 0; i -= graphResInc) {
            // for (let i = 0; i < interval + 1; i += graphResInc) {
            // console.log('i', i)
            labels.push(dayjs().subtract(interval - i, 'days')
                .format('MMM DD'));
            // console.log('dailyData[i]', dailyData[i])
            data.push(dailyData[i])
        }
        labels.reverse();
        data = data.reverse();
        // console.log('dailyData', dailyData)
        // console.log('labels', labels)
        // console.log('data', data)

        return {
            labels,
            data,
            currDataPoint,
            interval
        }
    }

    const graphResolutionIncrement = () => {

        // console.log('graphResolution', graphResolution)
        if (graphResolution === 'day') {
            return 1;
        } else if (graphResolution === 'week') {
            return 7;
        }
        // else if (graphResolution === 'month') {
        //     // todo: we'll treat month differently than week.
        //     // maybe do averaging or something else
        //     return 30;
        // }
    }


    const makeDailyGraphData = (filledRecords, interval) => {
        let dailyData = [];
        let timeIntervalNum;
        if (timeInterval === 'day') {
            timeIntervalNum = 1;
        } else if (timeInterval === 'week') {
            timeIntervalNum = 7;
        } else if (timeInterval === 'month') {
            timeIntervalNum = 30;
        }

        // creates dailyData array

        const freq = numTimes / timeIntervalNum;
        // const freq = 1;
        // console.log('timeIntervalNum', timeIntervalNum)
        console.log('numTimes', numTimes)
        // console.log('freq', freq)
        const checkMarkWeight = 1 / freq;
        let prevDataPoint = 0;
        let currDataPoint = prevDataPoint;
        let multiplier = Math.pow(0.5, freq / 13);

        let didCompleteHabit;

        // console.log('filledRecords', filledRecords)
        for (let i = 0; i < interval + 1; i++) {

            didCompleteHabit = filledRecords[0].datesWithGaps[i] !== 0
                ? checkMarkWeight
                : 0;
            // console.log('didCompleteHabit', didCompleteHabit)
            // console.log('filledRecords[0].datesWithGaps[i]', filledRecords[0].datesWithGaps[i])
            currDataPoint = currDataPoint * multiplier + didCompleteHabit * (1 - multiplier);
            // console.log('currDataPoint', currDataPoint)

            
            if (currDataPoint < 0) currDataPoint = 0;
            if (currDataPoint > 1) currDataPoint = 1;
            dailyData.push(100 * currDataPoint);
        }
        currDataPoint = 100* currDataPoint;


        return { dailyData, currDataPoint }
    }

    const chart = () => {
        const { data, labels } = dataForChart();
        setChartData({
            labels: labels,
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

    const handleGraphResolution = (e) => {
        setGraphResolution(e.target.value)

        return e.target.value
    }

    const renderGraphResolutionOptions = () => {

        return ['day', 'week'
            // , 'month'
        ].map(timeResolution => (
            <option
                key={timeResolution}
                id={timeResolution}
                value={timeResolution}
            >
                {timeResolution}
            </option>
        ))
    }


    // const graphLength = () => {
    //     const { interval } = dataForChart();
    //     // todo: get this function to fill width of parent div
    //     // if user only has little data ( ie when they first start out)


    //     let graphLen =
    //         interval * 1 / graphResolutionIncrement();

    //     // let graphLen = "100vw"

    //     // if graphLen is small, 
    //     // set canvas width to window width 
    //     // so, Math.max(graphLen, window width)
    //     let graphWrapperWidth = 900;
    //     graphLen = Math.max(graphLen, graphWrapperWidth)

    //     console.log('graphLen', graphLen)
    //     return graphLen;
    // }

    // const graphWrapperStyle = {
    //     width: graphLength(),
    //     height: "35vh",
    //     position: "relative",
    // };

    return (

        <section className="habit-data-container">
            <div className="habit-name-description">
                <h3 className="habit-name">
                    {/* {' '} */}
                    {name}
                </h3>
                <p className="habit-description">
                    {description}
                </p>
            </div>


            <div className="habit-strength-wrapper">
                <div className="habit-strength-score card">
                    <p className="habit-indicator">Your Habit Strength is currently </p>
                    <p className="habit-percentage">
                        {currHabitStrength.toFixed(2)} % </p>
                </div>
                <div className="habit-strength card">
                    <Doughnut className="line-chart" data={chartDoughnutData}
                        options={{
                            responsive: true,
                            // maintainAspectRatio: false,

                        }} />
                </div>
            </div>

            <div>
                <label
                    htmlFor='view-type'>
                    Time Interval </label>
                <select
                    name='view-type'
                    id='view-type'
                    aria-label='view-type'
                    value={graphResolution}
                    onChange={handleGraphResolution}
                >
                    {renderGraphResolutionOptions()}
                </select>
            </div>

            <div ref={graphContainerRef} className='graph-container bottom-card'>
                {/* todo: need y axis to be fixed to left side */}
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