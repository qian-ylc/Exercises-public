import { AlarmClock } from "./index.ts";

describe("AlarmClock", () => {
    let alarmClock: AlarmClock
    beforeEach(() => {
        alarmClock = new AlarmClock();
    })

    describe("通常", () => { // 通常状態の「アラーム解除」などのイベントのテストが必要？
        it("アラーム設定すると、「アラーム設定中」に遷移", () => {
            expect(alarmClock.setAlarm()).toEqual("none");
            expect(alarmClock.currentState).toEqual("alarmSet");
        });
    });

    describe("アラームセット中", () => {
        beforeEach(() => {
            alarmClock.setAlarm();
            expect(alarmClock.currentState).toEqual("alarmSet");
        });

        it("アラーム解除すると、通常状態に遷移", () => {
            expect(alarmClock.cancelAlarm()).toEqual("none");
            expect(alarmClock.currentState).toEqual("normal");
        });

        it("アラーム設定時間到達すると、「アラーム鳴動中」に遷移", () => {
            expect(alarmClock.reachedToAlarmTime()).toEqual("soundAlarm");
            expect(alarmClock.currentState).toEqual("alarmSounding");
        });
    });

    describe("アラーム鳴動中", () => {
        beforeEach(() => {
            alarmClock.setAlarm();
            alarmClock.reachedToAlarmTime();
            expect(alarmClock.currentState).toEqual("alarmSounding");
        });

        it("アラーム解除すると、「通常」状態に遷移", () => {
            expect(alarmClock.cancelAlarm()).toEqual("stopAlarm");
            expect(alarmClock.currentState).toEqual("normal");
        });

        it("スヌーズすると、「スヌーズ中」に遷移", () => {
            expect(alarmClock.snooze()).toEqual("stopAlarm");
            expect(alarmClock.currentState).toEqual("snoozing");
        });
    });

    describe("スヌーズ", () => {
        beforeEach(() => {
            alarmClock.setAlarm();
            alarmClock.reachedToAlarmTime();
            alarmClock.snooze();
            expect(alarmClock.currentState).toEqual("snoozing");
        });

        it("スヌーズ設定時間経過になると、「アラーム鳴動中」に遷移する", () => {
            expect(alarmClock.elapseSnoozeTime()).toEqual("soundAlarm");
            expect(alarmClock.currentState).toEqual("alarmSounding");
        });

        it("アラーム解除すると、「通常」に遷移する", () => {
            expect(alarmClock.cancelAlarm()).toEqual("none");
            expect(alarmClock.currentState).toEqual("normal");
        });

    });
});