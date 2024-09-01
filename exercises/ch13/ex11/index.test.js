import { retryWithExponentialBackoff } from ".";
import { expect, jest } from '@jest/globals'

describe("retryWithExponentialBackoff", () => {
    const funcSuccess = jest.fn();
    funcSuccess.mockImplementationOnce(() => {
        return true;
    });
    const funcFail3 = jest.fn();
    funcFail3.mockImplementationOnce(() => {
        throw new Error("error");
    }).mockImplementationOnce(() => {
        throw new Error("error");
    }).mockImplementationOnce(() => {
        throw new Error("error");
    }).mockImplementationOnce(() => {
        return true;
    });
    const funcFail5 = jest.fn();
    funcFail5.mockImplementationOnce(() => {
        return false;
    })


    test("1回で成功する関数", async () => {
        let result = await retryWithExponentialBackoff(funcSuccess, 5);
        expect(result).toBe(true);
    });

    test("最大リトライ回数内で成功する関数", async () => {
        // パスしたが実行時間がおかしい。50秒かかった？
        let result = await retryWithExponentialBackoff(funcFail3, 5);
        expect(result).toBe(true);
        expect(funcFail3).toHaveBeenCalledTimes(4);
    }, 100000);

    test("最大リトライ回数を超えても成功しない関数", async () => {
        let result1 = await retryWithExponentialBackoff(funcFail3, 2);
        expect(result1).toBe(false);
        let result2 = await retryWithExponentialBackoff(funcFail5, 3);
        expect(result2).toBe(false);
    });

});