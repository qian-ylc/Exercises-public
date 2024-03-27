import { abs, sum, factorial } from "./index.js";

// TypeScript の場合は以下:
// import { abs, sum, factorial } from "./index.ts";

describe("math", () => {
  describe("abs", () => {
    it("returns same value when positive value given", () => {
      expect(abs(42)).toBe(42);
    });

    it("returns negated value when negative value given", () => {
      expect(abs(-42)).toBe(42);
    });

    it("returns zero value when zero given", () => {
      expect(abs(0)).toBe(0);
    });
  });

  // 以下に sum, factorial のテストを記載せよ
  describe("sum", () => {
    it("returns correct value when positive value array given", () => {
      expect(sum([1, 2, 3, 4, 5])).toBe(15);
    });
    it("returns correct value when array contains both positive and negative value given", () => {
      expect(sum([1, 2, 3, -4, -5])).toBe(-3);
    });
    it("returns correct value when array contains only one number given", () => {
      expect(sum([10])).toBe(10);
    });
    it("returns init value when empty array given", () => {
      expect(sum([])).toBe(0);
    });
  })

  describe("factorial", () => {
    it("returns correct value when n>1 value given", () => {
      expect(factorial(5)).toBe(120);
    });
    it("returns init value when n<1 given", () => {
      expect(factorial(0)).toBe(1);
      expect(factorial(-5)).toBe(1);
    });
  })
});
