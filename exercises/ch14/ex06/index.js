// 任意のオブジェクトを引数に取る
// そのオブジェクトの任意のメソッド呼び出しに対して、以下を持つオブジェクトを配列に追加して保存する Proxy を作成する。言い換えると Proxy 経由のオブジェクトのメソッド呼び出し履歴を配列に記録する
// 呼び出された時刻
// メソッド名
// パラメータ(引数)
// Proxy と 配列 双方への参照を返却する

export function logProxy(obj) {
    let log = [];
    let handlers = {
        get(target, property, receiver) {
            // メソッドをゲットする
            let value = Reflect.get(target, property, receiver);
            // メソッドが関数の場合
            if (typeof value === 'function') {
                return function (...args) {
                    log.push({
                        timestamp: new Date(),
                        method: property,
                        parameters: args
                    });
                    return value.apply(this, args);
                };
            }
            return value;
        }
    }
    let proxy = new Proxy(obj, handlers);
    return { proxy, log };
}

