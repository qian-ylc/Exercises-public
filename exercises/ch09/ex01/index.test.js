import { C } from "./index.js"; // ts でも可

test("class puzzle", () => {
  expect(C.method()).toBe(1); // Cの静的メソッド
  expect(new C().method()).toBe(2); // Cのインスタンスのメソッド
  expect(C.C.method()).toBe(3); // クラスCにはCという静的フィールドがあって、その中には静的メソッドmethodがある
  expect(new C.C().method()).toBe(4); // 
  expect(new C().C.method()).toBe(5); // CのインスタンスにはCというフィールドがあって、このCにはメソッドmethodがある
  expect(new new C().C().method()).toBe(6);
});

