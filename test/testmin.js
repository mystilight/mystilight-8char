import paipan from '../src/index.min.js'
const { getCurrentEightCharJSON } = paipan
const sample = { year: 1999, month: 5, day: 25, hour: 14, minute: 30, second: 0, sect: 2, gender: 1, yunSect: 2 }
console.log(getCurrentEightCharJSON(sample))