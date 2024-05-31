import { bubblesort, quicksort, selectionsort } from ".";

describe("ソートアルゴリズム", () => {
    let a = []
    let b = [4]
    let c = [10, 49, 20, 59, 34, 10, 34, 3, 1]
    it("バブルソート", () => {
        expect(bubblesort(a)).toStrictEqual([])
        expect(bubblesort(b)).toStrictEqual([4])
        expect(bubblesort(c)).toStrictEqual([1, 3, 10, 10, 20, 34, 34, 49, 59])
    })
    it("選択ソート", () => {
        expect(selectionsort(a)).toStrictEqual([])
        expect(selectionsort(b)).toStrictEqual([4])
        expect(selectionsort(c)).toStrictEqual([1, 3, 10, 10, 20, 34, 34, 49, 59])
    })
    it("クイックソート", () => {
        expect(quicksort(a)).toStrictEqual([])
        expect(quicksort(b)).toStrictEqual([4])
        expect(quicksort(c)).toStrictEqual([1, 3, 10, 10, 20, 34, 34, 49, 59])
    })
})