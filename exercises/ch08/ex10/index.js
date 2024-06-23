export function addMyCall(f) {
    f.myCall = (...args) => {
        return f.bind(args[0], ...args.slice(1))() //1番目はバインドされるオブジェクト、残りは引数
    }
}