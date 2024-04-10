import { equals } from ".";

describe("オブジェクト", () => {
    it("{x:1, y:2} と {x:1, y:2}", async () => {
        expect(equals({ x: 1, y: 2 }, { x: 1, y: 2 })).toBe(true);
    });
    it("[1,2] と [1,2]", async () => {
        expect(equals([1, 2], [1, 2])).toBe(true);
    });
    it("{x:1, y:2} と {x:1, y:3}", async () => {
        expect(equals({ x: 1, y: 2 }, { x: 1, y: 3 })).toBe(false);
    });
    it("{x:1} と {x:1, y:3}", async () => {
        expect(equals({ x: 1 }, { x: 1, y: 3 })).toBe(false);
    });
    it("{} と {x:1, y:3}", async () => {
        expect(equals({}, { x: 1, y: 3 })).toBe(false);
    });
    it("{} と {}", async () => {
        expect(equals({}, {})).toBe(true);
    });
    it("{x:1, y:2} と {x:1, z:2}", async () => {
        expect(equals({ x: 1, y: 2 }, { x: 1, z: 2 })).toBe(false);
    });
    it("{x:1, y:2, z:[3,4]} と {x:1, y:2,z:[3,4]}", async () => {
        expect(equals({ x: 1, y: 2, z: [3, 4] }, { x: 1, y: 2, z: [3, 4] })).toBe(true);
    });
    it("{x:1, y:2, z:[3,4]} と {x:1, y:2,z:[3,5]}", async () => {
        expect(equals({ x: 1, y: 2, z: [3, 4] }, { x: 1, y: 2, z: [3, 5] })).toBe(false);
    });
    it("{x:1, y:2, z:[3,4]} と {x:1, y:2,z:3}", async () => {
        expect(equals({ x: 1, y: 2, z: [3, 4] }, { x: 1, y: 2, z: 3 })).toBe(false);
    });
});