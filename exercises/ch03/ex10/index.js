let sampleObject = { a: 1, b: 2, c: [3, 4], d: '5' }

for (let prop in sampleObject) {
    console.log(prop + ": " + sampleObject[prop])
}