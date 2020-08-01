import axios from 'axios';
import config from '../config';

const HabitsService = {

    async getHabits() {
        try {
            const url = `${config.API_ENDPOINT}/habits`
            const res = await axios.get(url)
            console.log('res', res)
            const resHabits = res.data;
            console.log('resHabits', resHabits)
            return resHabits;
        } catch (err) {
            console.log('err', err)
        }
    },
    async postHabit(newHabit) {
        try {
            const url = `${config.API_ENDPOINT}/habits`
            const res = await axios.post(url, 
                newHabit
            )
            console.log('res', res)
            const resHabits = res.data;
            console.log('resHabits', resHabits)
            return resHabits;
        } catch (err) {
            console.log('err', err)
        }
    },
    async deleteHabit(id) {
        try {
            const url = `${config.API_ENDPOINT}/habits/${id}`
            const res = await axios.delete(url, 
                id
            )
            console.log('res', res)
            const deletedHabit = res.data;
            console.log('deletedHabit', deletedHabit)
            return deletedHabit;
        } catch (err) {
            console.log('err', err)
        }
    }
}

export default HabitsService