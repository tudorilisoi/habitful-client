import axios from 'axios';
import config from '../config';

const HabitsService = {
    authToken: localStorage.getItem('authToken'),
    reqHeaders() {
        return {
            headers: {
                "authorization": `bearer ${this.authToken}`
            }
        }
    },
    async getHabits() {
        try {
            const url = `${config.API_ENDPOINT}/habits`;
            const res = await axios
                .get(url, this.reqHeaders())
            const resHabits = res.data;
            return resHabits;
        } catch (err) {
            console.log('err', err)
        }
    },
    async postHabit(newHabit) {
        try {
            const url = `${config.API_ENDPOINT}/habits`
            const res = await axios
                .post(url, newHabit, this.reqHeaders())
            const resHabits = res.data;
            return resHabits;
        } catch (err) {
            console.log('err', err)
        }
    },
    async getHabitById(id) {
        try {
            const url = `${config.API_ENDPOINT}/habits/${id}`
            const res = await axios
                .get(url, this.reqHeaders())
            const resHabit = res.data;
            return resHabit;
        } catch (err) {
            console.log('err', err)
        }
    },
    async updateHabit(newHabitFields, id) {
        try {
            const url = `${config.API_ENDPOINT}/habits/${id}`
            const res = await axios
                .patch(url, newHabitFields, this.reqHeaders())
            const updatedHabit = res.data;
            return updatedHabit;
        } catch (err) {
            console.log('err', err)
        }
    },
    async deleteHabit(id) {
        try {
            const url = `${config.API_ENDPOINT}/habits/${id}`
            await axios
                .delete(url, this.reqHeaders())
        } catch (err) {
            console.log('err', err)
        }
    }
}

export default HabitsService