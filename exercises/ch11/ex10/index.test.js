import { countOfDaysExceptWeekend, countOfDaysInMonth, localeOfDay, startOfLastMonth } from ".";

describe("countOfDaysInMonth", () => {
    test("2021年1月は31日", () => {
        expect(countOfDaysInMonth(1, 2021)).toBe(31);
    });
    test("2021年2月は28日", () => {
        expect(countOfDaysInMonth(2, 2021)).toBe(28);
    });
    test("2024年2月は29日", () => {
        expect(countOfDaysInMonth(2, 2024)).toBe(29);
    });
    test("2024年4月は30日", () => {
        expect(countOfDaysInMonth(4, 2024)).toBe(30);
    });
})

describe("countOfDaysExceptWeekend", () => {
    test("2024年7月1日から2024年7月31日までの平日は23日", () => {
        expect(countOfDaysExceptWeekend("2024-07-01", "2024-07-31")).toBe(23);
    });
    test("2024年1月1日から2024年7月31日までの平日は153日", () => {
        expect(countOfDaysExceptWeekend("2024-01-01", "2024-07-31")).toBe(153);
    })
})

describe("localeOfDay", () => {
    test("2024年7月27日は土曜日", () => {
        expect(localeOfDay("2024-07-27", "ja-JP")).toBe("土曜日");
    });
    test("英語の場合", () => {
        expect(localeOfDay("2024-07-27", "en-US")).toBe("Saturday");
    });
    test("中国語の場合", () => {
        expect(localeOfDay("2024-07-27", "zh-CN")).toBe("星期六");
    });
})

describe("startOfLastMonth", () => {
    test("2023-01-01の前月の開始日は2022-12-01", () => {
        expect(startOfLastMonth(new Date("2023-01-01")).toString()).toBe("Thu Dec 01 2022 00:00:00 GMT+0900 (日本標準時)");
    });
    test("引数なしの場合は現在日付の前月の開始日", () => {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const expected = new Date(year, month - 1, 1).toISOString();
        expect(startOfLastMonth().toISOString()).toBe(expected);
    });
})