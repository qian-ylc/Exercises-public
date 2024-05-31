const data = [
    { name: "Alice", class: "A", math: 10, chemistry: 30, geography: 20 },
    { name: "Bob", class: "A", math: 50, chemistry: 50, geography: 60 },
    { name: "Carol", class: "A", math: 70, chemistry: 55, geography: 30 },
    { name: "Dave", class: "B", math: 40, chemistry: 20, geography: 60 },
    { name: "Ellen", class: "B", math: 60, chemistry: 70, geography: 40 },
    { name: "Frank", class: "B", math: 90, chemistry: 70, geography: 80 },
    { name: "Isaac", class: "C", math: 70, chemistry: 40, geography: 50 },
    { name: "Justin", class: "C", math: 80, chemistry: 40, geography: 30 },
    { name: "Mallet", class: "C", math: 60, chemistry: 70, geography: 90 },
];

// 1
let sumMath = 0
data.forEach((element) => sumMath += element.math)
console.log("mathの全員の合計点: " + sumMath)

// 2
let sumChemA = 0
let count = 0
data.forEach((element) => {
    if (element.class === "A") {
        sumChemA += element.chemistry
        count += 1
    }
})
console.log("クラスAのchemistryの平均点: " + sumChemA / count)

// 3
let dataC = data.filter(element => element.class === "C")
let sumC = 0
dataC.forEach((element) => {
    sumC += element.math + element.chemistry + element.geography
})
console.log("3科目合計点のクラスC内での平均点: " + sumC / dataC.length)

// 4
let arrayScore3 = []
data.forEach((element, i) => {
    arrayScore3[i] = element.chemistry + element.math + element.geography
})
let maxScore3 = arrayScore3.reduce((a, b) => Math.max(a, b), -1);
let nameindex = arrayScore3.indexOf(maxScore3)
let name = data[nameindex].name
console.log("3科目合計点が最も高い人のname: " + name)

// 5
let avgGeo = 0
data.forEach((element) => {
    avgGeo += element.geography
})
avgGeo /= data.length // 平均
let dataGeoVarArray = data.map((element, i) => (element.geography - avgGeo) ** 2)
let dataGeoVar = 0
dataGeoVarArray.forEach((element) => {
    dataGeoVar += element
})
dataGeoVar /= data.length // 分散
dataGeoStd = Math.sqrt(dataGeoVar)
console.log("全体のgeographyの標準偏差: " + dataGeoStd)
