import { retryWithExponentialBackoff } from ".";
import { jest } from '@jest/globals'

describe("retryWithExponentialBackoff", () => {
    // ３回エラーして、最後に成功する関数のモックの作成？
    test("should retry with exponential backoff", () => {
        const func = jest.fn();
        func.mockImplementationOnce(() => {
            throw new Error("error");
        }).mockImplementationOnce(() => {
            throw new Error("error");
        }).mockImplementationOnce(() => {
            throw new Error("error");
        }).mockImplementationOnce(() => {
            return true;
        });

        const callback = jest.fn();
        retryWithExponentialBackoff(func, 5, callback);

        expect(func).toHaveBeenCalledTimes(4);
        expect(callback).toHaveBeenCalledWith(true);
    });
})