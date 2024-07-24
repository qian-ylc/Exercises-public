import { littleToBig, bigToLittle } from ".";

describe("littleToBig", () => {
    it("little endian to big endian", () => {
        let array = new Uint32Array(10);
        array[0] = 10;
        array[1] = 1;
        array[2] = 2;
        array[3] = 3;
        array[4] = 100;
        array[8] = 8;
        let result = littleToBig(array);
        expect(result).toEqual(new Uint32Array([167772160, 16777216, 33554432, 50331648, 1677721600, 0, 0, 0, 134217728, 0]));

    });
})

describe("bigToLittle", () => {
    it("big endian to little endian", () => {
        let array = new Uint32Array(10);
        array[0] = 167772160;
        array[1] = 16777216;
        array[2] = 33554432;
        array[3] = 50331648;
        array[4] = 1677721600;
        array[8] = 134217728;
        let result = bigToLittle(array);
        expect(result).toEqual(new Uint32Array([10, 1, 2, 3, 100, 0, 0, 0, 8, 0]));
    });
})