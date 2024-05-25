export function restrict(target, template) {
    for (let key of Object.getOwnPropertyNames(target)) { // targetの全てのSymbol以外の独自プロパティ
        if (!Reflect.ownKeys(template).includes(key)) {  // テンプレートの独自プロパティに存在しないなら削除
            delete target[key]
        }
    }
    return target
}

export function substract(target, ...sources) {
    for (let source of sources) {
        for (let key of Object.getOwnPropertyNames(source)) { // 削除対象指定オブジェクトの全てのSymbol以外の独自プロパティ
            if (Reflect.ownKeys(target).includes(key)) {  // 削除先オブジェクトにはそのキーがあれば削除
                delete target[key]
            }
        }
    }
    return target
}