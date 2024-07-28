// ファイルのパスを引数に受けとる関数で、ファイルのサイズが許容サイズをオーバーしている場合に投げるエラー
// コンストラクタ引数：ファイルのパス、ファイルのサイズ、許容サイズ
class fileOverSizeError extends Error {
    constructor(path, size, limit) {
        super(`File ${path} is oversize. Size: ${size}, limit: ${limit}`); // エラーメッセージ
        this.path = path;
        this.size = size;
        this.limit = limit;
    }

    get name() {
        return 'fileOverSizeError';
    }
}