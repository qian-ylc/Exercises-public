import dayjs from 'dayjs'
console.log(dayjs().format()) // 2024-07-17T17:36:52+09:00
console.log(dayjs()
    .startOf('month')
    .add(1, 'day')
    .set('year', 2018)
    .format('YYYY-MM-DD HH:mm:ss')) // 2024-07-17T17:37:20+09:00