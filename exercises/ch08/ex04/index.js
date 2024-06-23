const obj = {
    om: function () {
        const nest = {
            nm: function () {
                console.log(this) // { nm: [Function: nm], arrow: [Function: arrow] }
                console.log(this === obj, this === nest);
            },
            arrow: () => {
                console.log(this) // { om: [Function: om] }
                console.log(this === obj, this === nest);
            },
        };
        nest.nm();
        nest.arrow();
    },
};
obj.om();

// 予想
// nest.nm(): false true; nest.arrow(): true false
// 実際
// nest.nm(): false true; nest.arrow(): true false
// p.208より、「アロー関数以外の入れ子型の関数は外側のthisの値を継承しません。」
// nest.nm()はアロー関数以外の入れ子型で、objのthisでなく、自分のthisを使う
// nest.arrow()はアロー関数で、objからthisを継承