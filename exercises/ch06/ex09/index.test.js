import { jest } from '@jest/globals'

const mock = jest.fn();

const obj = {
    x: 0,
    y: 0,
    sum() {
        // mock();
        return this.x + this.y;
    },
};

obj.toJSON = function () { return `{ "x": ${this.x}, "y": ${this.y}, "sum": ${this.sum()} } ` }

obj.x = 1;
obj.y = 2;
console.log(JSON.stringify(obj))
// console.log(JSON.stringify(obj))は"{ \"x\": 1, \"y\": 2, \"sum\": 3 } "の結果得られたが、
// Received: "\"{ \\\"x\\\": 1, \\\"y\\\": 2, \\\"sum\\\": 3 } \""になった
expect(JSON.stringify(obj)).toBe(`{ "x": 1, "y": 2, "sum": 3 } `);
expect(mock).toHaveBeenCalled();

