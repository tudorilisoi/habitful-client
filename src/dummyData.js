// import dayjs from 'dayjs';



const dayjs = require("dayjs")


const habits = [

    {
        id: 1,
        name: 'Walk for 1 hour each day',
        num_times: 1,
        time_interval: 'day',
        date_created: '2020-06-28T11:00:00Z',
        user_id: 1
    },
    {
        id: 2,
        name: 'Meditate 15 min each day',
        num_times: 1,
        time_interval: 'day',
        date_created: '2020-06-29T11:00:00Z',
        user_id: 1
    },
    {
        id: 3,
        name: 'Drink 2L water each day',
        num_times: 1,
        time_interval: 'day',
        date_created: '2020-06-30T11:00:00Z',
        user_id: 1
    }
]


const makeDummyRecords = (num) => {
    let currDate = []
    for (let i = num; i >= 0; i--) {
        currDate.push(dayjs().subtract(i, 'days').format());
    }
    return currDate
}

const habit_records = [
    makeDummyRecords(30)
]

module.exports = {
    habits,
    habit_records,
    makeDummyRecords
}

