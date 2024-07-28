export function modifyUrl(options) {
    let url;
    let addQuery;
    let path;

    // ベースのURLをチェック
    try {
        url = new URL(options.base);
    } catch (e) {
        throw new Error("Invalid URL format");
    }
    // クエリを追加
    if (options.addQuery) {
        addQuery = options.addQuery
        addQuery.forEach(([key, value]) => {
            url.searchParams.append(key, value);
        });
    }
    // パスを追加
    if (options.path) {
        path = options.path
        url.pathname = path;
    }

    return url.toString();
}