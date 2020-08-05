


const habitStrength = () => {

    const timeInterval = 7; // days
    const timesCompleted = 7; // times per interval 
    const freq = timesCompleted / timeInterval;
    const numDays = 30; // length for dummy array (for testing)
    let prevHabitStrength = 0;
    const checkMarkWeight = 1 / freq;

    const dummyCheckMarkArr = Array(numDays).fill(0)
        .map((checkMarkVal, i, arr) => {
            const userCompletionRate = 1; // 1 = 100%
            checkMarkVal = Math.random() < freq * userCompletionRate
                ? checkMarkWeight
                : 0;
            return checkMarkVal;
        });

    let habitStrength = prevHabitStrength;
    let multiplier = Math.pow(0.5, freq / 13); // 

    for (let i = 0; i < numDays; i++) {

        // habitStrength formula
        habitStrength = habitStrength * multiplier + dummyCheckMarkArr[i] * (1 - multiplier)

        habitStrength = habitStrength < 0 ? 0 : habitStrength;
        habitStrength = habitStrength > 1 ? 1 : habitStrength;

        console.log('day', i, 'habitStrength', habitStrength)
    }

    const countOccurrences = (arr) => arr.reduce((a, v) => (v > 0 ? a + 1 : a), 0);
    const numCompletions = countOccurrences(dummyCheckMarkArr);
    console.log('dummyCheckMarkArr', dummyCheckMarkArr)
    console.log('checkMarkWeight', checkMarkWeight)
    console.log('multiplier', multiplier)
    console.log('numCompletions', numCompletions, '/', numDays)
}

module.exports = habitStrength;