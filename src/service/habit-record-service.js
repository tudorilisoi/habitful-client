import axios from 'axios';
import config from '../config';

const HabitRecordsService = {
    async reqHeaders() {
        const authToken = localStorage.getItem('authToken')
        return {
            headers: {
                "authorization": `bearer ${authToken}`
            }
        }
    },
    async getHabitRecords() {
        try {
            const url = `${config.API_ENDPOINT}/habit-records`
            const res = await axios.get(url, await this.reqHeaders())
            const resHabitRecords = res.data;
            return resHabitRecords;
        } catch (err) {
            console.log('err', err)
        }
    },
    async postHabitRecord(newHabitRecord) {
        try {
            const url = `${config.API_ENDPOINT}/habit-records`
            const res = await axios
                .post(url, newHabitRecord, await this.reqHeaders())
            const resHabitRecords = res.data;
            return resHabitRecords;
        } catch (err) {
            console.log('err', err)
        }
    },
    async getHabitRecordsById(id) {
        try {
            const url = `${config.API_ENDPOINT}/habit-records/record/${id}`
            const res = await axios.get(url, await this.reqHeaders())
            const resHabitRecords = res.data;
            return resHabitRecords;
        } catch (err) {
            console.log('err', err)
        }
    },
    async deleteHabitRecord(id) {
        try {
            const url = `${config.API_ENDPOINT}/habit-records/record/${id}`
            const res = await axios.delete(url, await this.reqHeaders())
            const deletedRecord = res.data;
            return deletedRecord;
        } catch (err) {
            console.log('err', err)
        }
    }
}

export default HabitRecordsService;