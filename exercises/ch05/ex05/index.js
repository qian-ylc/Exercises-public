export function evenExtract(nums) {
    let result = {}
    for (let [i, j] of Object.entries(nums)) {
        if (j % 2 === 0) {
            result[i] = j
        }
    }
    return result
}