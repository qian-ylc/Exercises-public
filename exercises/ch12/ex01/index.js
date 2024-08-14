function counterIter(max) {
    console.log("counterIter");
    let c = 1;
    return {
        [Symbol.iterator]() {
            console.log("counterIter: Symbol.iterator");
            return this;
        },
        next() {
            console.log("counterIter: next");
            if (c >= max + 1) {
                return { value: undefined, done: true };
            }
            const value = c;
            c++;
            return { value, done: false };
        },
        return(value) {
            console.log("counterIter: return:", value);
            return { value, done: true };
        },
        throw(e) {
            console.log("counterIter: throw:", e);
            throw e;
        },
    };
}

function* counterGen(max) {
    console.log("counterGen");
    try {
        for (let c = 1; c <= max; c++) {
            console.log("counterGen: next");
            yield c;
        }
    } catch (e) {
        console.log("counterGen: catch:", e);
    } finally {
        console.log("counterGen: finally");
    }
}

// イテレータ
// 関数からメソッドを呼び出す
counterIter().next() // counterIter counterIter: next { value: 1, done: false }
counterIter(3).next() // counterIter counterIter: next { value: 1, done: false }
counterIter(3).next() // counterIter counterIter: next { value: 1, done: false }
counterIter()[Symbol.iterator]()
/* 
counterIter
counterIter: Symbol.iterator
{
  next: [Function: next],
  return: [Function: return],
  throw: [Function: throw],
  [Symbol(Symbol.iterator)]: [Function: [Symbol.iterator]]
}
*/
counterIter(3).return(6) // counterIter counterIter: return: 6 { value: 6, done: true }
counterIter(3).throw("err") // counterIter counterIter: throw: err Uncaught 'err'

// オブジェクトからメソッドを呼び出す
let iter = counterIter(2);
iter[Symbol.iterator]();
/*
counterIter: Symbol.iterator
{
  next: [Function: next],
  return: [Function: return],
  throw: [Function: throw],
  [Symbol(Symbol.iterator)]: [Function: [Symbol.iterator]]
}
*/
iter.next(); // counterIter: next { value: 1, done: false }
iter.next(); // counterIter: next { value: 2, done: false }
iter.next(); // counterIter: next { value: undefined, done: true }

// return()とthrow()
iter = counterIter(2);
iter.return(4); // counterIter: return: 4 { value: 4, done: true }
iter.return("a"); // counterIter: return: a { value: 'a', done: true }
iter.throw("err") // counterIter: throw: err Uncaught 'err'
iter.throw(123) // counterIter: throw: 123 Uncaught 123

// ジェネレータ
// ジェネレータオブジェクトからメソッドを呼び出す
let gen = counterGen(2);
gen.next(); // counterGen counterGen: next { value: 1, done: false } 一回目だけcounterGenが出力される
gen.next(); // counterGen: next { value: 2, done: false }
gen.next(); // counterGen: finally { value: undefined, done: true }
gen.return(4); // { value: 4, done: true }
gen.throw("err") // Uncaught 'err'

let gen2 = counterGen(3)
gen2.next(); // counterGen counterGen: next { value: 1, done: false }
gen2.return(10); // counterGen: finally { value: 10, done: true } ジェネレータを強制的に戻す?

let gen3 = counterGen(10)
gen3.next(); // counterGen counterGen: next { value: 1, done: false }
gen3.throw(100);
/*
例外を発生させて、catch -> finally
counterGen: catch: 100
counterGen: finally
{ value: undefined, done: true }
*/