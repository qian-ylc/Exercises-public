export function counterGroup() {
    // 各counterGroupに保有しているプライベート変数 
    // cg = counterGroup()で、一つのcounterGroupを生成
    let counterCount = 0 // これまで返却されたcounterの数
    let everyCounter = [] // 各counterのcount
    return {
        newCounter: function () { // p.226
            // 各counterに保有しているプライベート変数 
            // counter = cg.newCounter()で、一つのcounterを生成
            let n = 0
            let counterNumber = counterCount // 何番目のcounter
            everyCounter[counterNumber] = 0
            counterCount++
            return {
                count: function () { everyCounter[counterNumber]++; return n++; },
                reset: function () { everyCounter[counterNumber] = 0; n = 0; }
            }
        },
        total: function () { return everyCounter.reduce((sum, element) => sum + element, 0) },
        average: function () {
            if (counterCount === 0) throw TypeError()
            return this.total() / counterCount
        },
        variance: function () {
            if (counterCount < 2) throw TypeError()
            let avg = this.average()
            let square = everyCounter.map(element => (element - avg) ** 2).reduce((sum, element) => sum + element, 0)
            return square / counterCount
        }
    }
}

// cg { newCounter: [Function: newCounter], total: [Function: total] }
// c1 { count: [Function: count], reset: [Function: reset] }
// c1.count() > total++ > cg.total()が変更?