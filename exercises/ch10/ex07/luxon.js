import { DateTime } from 'luxon';

const dt = DateTime.local(2017, 5, 15, 8, 30);
console.log(dt) // DateTime { ts: 2017-05-15T08:30:00.000+09:00, zone: Asia/Tokyo, locale: ja-JP }