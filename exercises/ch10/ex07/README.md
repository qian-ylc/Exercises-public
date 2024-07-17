date-fns:\
https://github.com/date-fns/date-fns/tree/main/src \
ソースコードのsrcディレクトリの下に、各モジュールはそれぞれのフォルダーを持っている。\
各モジュールのフォルダーには、`index.ts`と`test.ts`のファイルがある。`index.ts`に、それぞれのモジュールを定義してエクスポートする。\
srcディレクトリの下の`index.ts`には、
```
export * from "./add/index.js";
export * from "./addBusinessDays/index.js";
export * from "./addDays/index.js";
export * from "./addHours/index.js";
export * from "./addISOWeekYears/index.js";
```
のように、各モジュールをエクスポートする。
node_modules/date-fnsには、
````
endOfDay.d.mts
endOfDay.d.ts
endOfDay.js
endOfDay.mjs
````
のように、各モジュールには4つのファイルが持っている。

Luxon:\
https://github.com/moment/luxon/tree/master/src \
srcディレクトリの下には、各モジュールのファイルがあり、\
ファイルの数が少ないて、各ファイルの中身が多い。\
luxon.jsには、それらのモジュールをインポートして、再エクスポートする。\
node_modules/luxon/srcには、ほぼソースコードのsrcと同じような感じ

dayjs:\
https://github.com/iamkun/dayjs/tree/dev/src \
https://day.js.org/docs/en/installation/typescript \
srcディレクトリの下には、localeとplaginフォルダ、`constant.js``index.js``utils.js`だけがある。\
`index.js`に、`export default dayjs`でエクスポートする。\
インポートするときも、`import dayjs from 'dayjs'`だけで良い \
pluginやlocaleを利用したいのは、それぞれインポートする必要がある。\
```
import * as isLeapYear from 'dayjs/plugin/isLeapYear' // import plugin
import 'dayjs/locale/zh-cn' // import locale
```
node_modules/dayjsには、dayjs.min.jsが最小化されたみたい





