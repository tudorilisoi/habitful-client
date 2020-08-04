import axios from 'axios';
import config from '../config';

const HabitRecordsService = {

    async getHabitRecords() {
        console.log('getHabitRecords ran')

        try {
            const url = `${config.API_ENDPOINT}/habit-records`
            const res = await axios.get(url)
            console.log('res', res)
            const resHabitRecords = res.data;
            console.log('resHabitRecords', resHabitRecords)
            return resHabitRecords;
        } catch (err) {
            console.log('err', err)
        }
    },
    async postHabitRecord(newHabitRecord) {
        console.log('getHabitRecords ran')
        try {
            const url = `${config.API_ENDPOINT}/habit-records`
            const res = await axios.post(url, 
                newHabitRecord
            )
            console.log('res', res)
            const resHabitRecords = res.data;
            console.log('resHabitRecords', resHabitRecords)
            return resHabitRecords;
        } catch (err) {
            console.log('err', err)
        }
    },
    async getHabitRecordsById(id) {
        console.log('getHabitRecordsById ran')

        try {
            const url = `${config.API_ENDPOINT}/habit-records/record/${id}`
            const res = await axios.get(url)
            // console.log('res', res)
            const resHabitRecords = res.data;
            console.log('resHabitRecords', resHabitRecords)
            return resHabitRecords;
        } catch (err) {
            console.log('err', err)
        }
    },
    async deleteHabitRecord(id) {
        console.log('id', id)
        console.log('getHabitRecords ran')
        try {
            const url = `${config.API_ENDPOINT}/habit-records/record/${id}`
            const res = await axios.delete(url, 
                id
            )
            console.log('res', res)
            const deletedRecord = res.data;
            console.log('deletedRecord', deletedRecord)
            return deletedRecord;
        } catch (err) {
            console.log('err', err)
        }
    }
}

export default HabitRecordsService