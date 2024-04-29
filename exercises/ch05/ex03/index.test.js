import { holiday_ifelse, holiday_switch } from ".";

describe('完全週休二日制 if-else', () => {
    it('平日の場合', () => {
        expect(holiday_ifelse("月")).toBe(false);
        expect(holiday_ifelse("木")).toBe(false);
    })
    it('土日の場合', () => {
        expect(holiday_ifelse("土")).toBe(true);
    })
    it('日曜日の場合', () => {
        expect(holiday_ifelse("日")).toBe(true);
    })
})

describe('完全週休二日制 switch', () => {
    it('平日の場合', () => {
        expect(holiday_switch("月")).toBe(false);
        expect(holiday_switch("木")).toBe(false);
    })
    it('土日の場合', () => {
        expect(holiday_switch("土")).toBe(true);
    })
    it('日曜日の場合', () => {
        expect(holiday_switch("日")).toBe(true);
    })
})