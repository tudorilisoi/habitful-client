import dayjs from 'dayjs';
import moment from 'moment';

// const isBetween = require('dayjs/plugin/isBetween')
// dayjs.extend(isBetween)
// const utc = require('dayjs/plugin/utc')
// dayjs.extend(utc);

const localDateRecordsToCheckMarksArray = () => {

    // const dummyLocalDates = () => {
    //     const dates = []
    //     const dateStart = moment('2020-01-01T00:00:00Z')
    //     const dateEnd = moment('2020-01-01T00:00:00Z').add(100, 'days')
    //     while (dateEnd.diff(dateStart, 'days') >= 0) {
    //         dates.push(dateStart.format())
    //         dateStart.add(Math.ceil(Math.random() * 3), 'days')
    //     }
    //     return dates
    // }

    // const dummyLocalDatesArr = dummyLocalDates();
    // // console.log('dummyLocalDatesArr', dummyLocalDatesArr)

    // const addIds = (dummyLocalDatesArr) => {
    //     console.log('dummyLocalDatesArr ran')
    //     const len = dummyLocalDatesArr.length
    //     let i = 1;
    //     const datesObjArr = [{
    //         id: 0,
    //         date_completed: dummyLocalDatesArr[0]
    //     }]
    //     while (i < len) {
    //         datesObjArr.push({
    //             id: datesObjArr[i - 1].id + Math.ceil(Math.random() * 3),
    //             date_completed: dummyLocalDatesArr[i]
    //         })
    //         i++
    //     }



    //     return datesObjArr
    // }
    // const dummyLocalDatesObjArr = addIds(dummyLocalDatesArr)
    // // console.log('dummyLocalDatesObjArr', dummyLocalDatesObjArr)







    // // now lets convert the dates to UTC

    // const localArrayToUTC = (dummyLocalDatesObjArr) => {
    //     const datesArr = []
    //     for (let i = 0; i < dummyLocalDatesArr.length; i++) {
    //         datesArr.push({
    //             id: dummyLocalDatesObjArr[i].id,
    //             date_completed: moment(dummyLocalDatesObjArr[i].date_completed).utc().format()
    //         })
    //     }

    //     return datesArr
    // }

    // const UTCObjArray = localArrayToUTC(dummyLocalDatesObjArr)
    // const sortedArray = UTCObjArray.sort((a, b) => moment(a.date_completed).diff(b.date_completed))
    // console.log('sortedArray', sortedArray)


    // const datesArrUTC = []
    // const sortedArrToUTCDatesArr = (sortedArray) => {

    //     sortedArray.map((dates) => datesArrUTC.push(dates.date_completed))
    //     return datesArrUTC
    // }
    // // console.log('datesArrUTC', datesArrUTC)

    // const UTCArray = sortedArrToUTCDatesArr(sortedArray)
    // // console.log('UTCArray', UTCArray)


    // const localDatesArr = UTCArray.map(date => moment(date).format())
    // // console.log('localDatesArr', localDatesArr)


    // const recordsToCheckMarkArray = (localDatesArr) => {
    //     const checkMarkArr = [];
    //     const checkMarkWeight = 1;
    //     const timeInterval = 365;
    //     const len = timeInterval;
    //     const rawStartDate = moment('2020-07-16T09:42:23-07:00').startOf('day')
    //     const startDate = moment(rawStartDate).subtract('1', 'year')
    //     const endDate = moment()
    //     console.log('startDate', startDate)
    //     console.log('endDate', endDate)
    //     let i = 0;
    //     let theDiff = endDate.diff(startDate, 'days') >= 0

    //     while (theDiff) {
    //         theDiff = endDate.diff(startDate, 'days') > 0
    //         console.log('theDiff', theDiff)
    //         console.log('startDate.format()', startDate.format())

    //         console.log('endDate.format()', endDate.format())
    //         console.log('endDate.diff(startDate, \'days\')', endDate.diff(startDate, 'days'))



    //         // if startDate is same as localDatesArr[i], then push 1 to new arr, else push 0
    //         // return 0 010 1 01 01 array thing


    //         // FIGURE OUT WHY startDate.isSame(date,'day') never returns true....
    //         // also go up and make smaller arrays to work with
    //         // maybe startDate isnt changing as it should as far as the diff function is concerned
    //         // maybe assign a constant variable to startDate so it can take the current start date value and 
    //         // keep it immutable
    //         // also, change startDate name to something more sensible

    //         if (localDatesArr.find((date) => {
    //             console.log('startDate', startDate)
    //             console.log('date', date)
    //             console.log('startDate.format()', startDate.format())
    //             const startDateFormatted = startDate.format()
    //             return moment(startDateFormatted).isSame(date, 'day')
    //             // return startDate.isSame(moment(date), 'day')
    //         }) > 0) {

    //             console.log('found date!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
    //         }


    //         startDate.add(1, 'day');
    //         i++
    //         console.log('i', i)





    //         // if (startdate matches some date in localDatesArr) {
    //         //     checkMarkArr.push(1)
    //         // } else {
    //         //     checkMarkArr.push(0)
    //         // }

    //     }

    //     console.log('startDate.format()', startDate.format())

    //     console.log('checkMarkArr', checkMarkArr)
    //     return checkMarkArr


    //     // localDatesArr.map(date=> {
    //     //     console.log('date', date)
    //     //     // if (moment(date.format()).isBetween(moment(date.format()).startOf('day'),moment(date.format()).endOf('day'),'day'))
    //     // })


    // }


    // console.log('recordsToCheckMarkArray(localDatesArr)', recordsToCheckMarkArray(localDatesArr))






    // // const dummyLocalDates1 = () => {
    // //     const dates = []
    // //     const dateStart = moment('2019-07-02T04:39:54Z')
    // //     const dateEnd = moment('2019-07-02T04:39:54Z').add(100, 'days')
    // //     while (dateEnd.diff(dateStart, 'days') >= 0) {
    // //         dates.push(dateStart.format())
    // //         dateStart.add(Math.ceil(Math.random() * 3), 'days')
    // //     }
    // //     //     const startDate = moment(rawStartDate).subtract('1', 'year')
    // //     //     const endDate = moment()
    // //     //     while (endDate.diff(startDate,'days') >= 0) {
    // //     //         i++
    // //     //         console.log('i', i)
    // //     //     }






    // //     return dates
    // // }
    // // console.log(dummyLocalDates1())

















    const dateFormat = 'YYYY MM DD'
    const freq = 3/7; // times completed per time interval. ie 3 times per week
    const checkMarkWeight = +(1 / freq).toFixed(2);

    const gapArray = [
        '2020 07 01',
        '2020 07 05',
        '2020 07 10',
        '2020 07 11'
    ]

    // goal is to insert 0's in the missing gaps
    // and replace dates with checkMarkWeight value

    const dateStart = gapArray[0]
    const dateEnd = dayjs().format(dateFormat)
    console.log('dateEnd', dateEnd)

    const checkMarkArray = []
    // start on first date of gapArray,
    // push in checkMarkWeight int checkMarkArray
    // see how many days between next date
    // push that many zero's to checkMarkArray
    // repeat until end
    
    let daysBetween
    for (let i = 0; i < gapArray.length-1; i++) {
        console.log('i', i)
        checkMarkArray.push(checkMarkWeight)
        daysBetween = dayjs(gapArray[i+1]).diff(gapArray[i],'days')-1
        checkMarkArray.push(new Array(daysBetween).fill(0))
        console.log('daysBetween', daysBetween)
    }
    checkMarkArray.push(checkMarkWeight)
    const checkMarkArrayFlattened  = checkMarkArray.flat()
    
    console.log('checkMarkArray', checkMarkArray)
    console.log('checkMarkArrayFlattened', checkMarkArrayFlattened)





























}












export default localDateRecordsToCheckMarksArray


























// const localDateRecordsToCheckMarksArray = () => {
//     const randomizer = (percentage) => {
//         if (Math.random() < percentage) {
//             return true
//         }
//         return false
//     }
//     const checkMarkWeight = 1; // 1/freq
//     const len = 100;
//     const checkMarkArr = []

//     for (let i = 0; i < len; i++) {
//         if (randomizer(0.5)) {
//             console.log('randomizer(0.5)', randomizer(0.5))
//             checkMarkArr.push(checkMarkWeight)
//         } else {
//             checkMarkArr.push(0)
//         }

//     }
//     console.log('checkMarkArr', checkMarkArr)
// }

// export default localDateRecordsToCheckMarksArray