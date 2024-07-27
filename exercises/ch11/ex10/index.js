export function countOfDaysInMonth(month, year) {
    // 引数の月は1-12であるが、monthは0から始める
    // dateの日付を0にすると、前月の最終日になる
    return new Date(year, month, 0).getDate();
}

export function countOfDaysExceptWeekend(startDate, endDate) {
    let count = 0;
    let currentDate = new Date(startDate);
    endDate = new Date(endDate);
    while (currentDate <= endDate) {
        const day = currentDate.getDay();
        // 日曜日のdayは0
        if (day !== 0 && day !== 6) {
            count++;
        }
        currentDate.setDate(currentDate.getDate() + 1);
    }
    return count;
}

export function localeOfDay(date, locale) {
    let currentDate = new Date(date);
    // https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Date/getDay
    const options = { weekday: "long" };
    return new Intl.DateTimeFormat(locale, options).format(currentDate);
}

// ローカルのタイムゾーンにおいて先月 1 日 0 時 0 分 0 秒
// 結果をtoLocaleString()で検証？
export function startOfLastMonth(currentDate) {
    if (!currentDate) {
        currentDate = new Date();
    }
    let year = currentDate.getFullYear();
    // Dateオブジェクト設定のため -1
    let month = currentDate.toISOString().slice(5, 7) - 1;

    return new Date(year, month - 1, 1);
}



