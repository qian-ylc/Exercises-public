// https://neln.net/a/1697792931
// 各ステップの説明の参考
import crypto from "crypto";
import * as fsPromises from "node:fs/promises";
// ここを埋める

// 鍵を生成する
function generateKey() {
    // 32バイトの暗号論的疑似乱数を生成する
    // ここを埋める
    const key = crypto.randomBytes(32);
    return key;
}

// 平文を鍵とAES-256-CBCで暗号化する。次に、暗号文と初期化ベクトル(IV)を、Base64エンコードして返す。
function encrypt64(text, key) {
    // 16バイトの暗号論的疑似乱数を初期化ベクトル (IV) とする
    // ここを埋める
    // IV(初期化ベクトル)は、暗号化時に最初のブロックを暗号化するために利用される、ランダムな値です。
    const iv = crypto.randomBytes(16);

    // 暗号化とBase64エンコード
    // ここを埋める
    // 暗号化アルゴリズム、鍵、IVを指定
    // update関数で暗号化した結果が返ってきます
    // 最後まで暗号化できたら、final関数で終端を取得
    const cipher = crypto.createCipheriv("aes-256-cbc", key, iv);
    const encryptedBase64 = Buffer.concat([cipher.update(text, "utf8"), cipher.final()]).toString("base64");

    // 暗号文とIVをbase64で返す
    return {
        value: encryptedBase64,
        iv: iv.toString("base64"),
    };
}

// generateKeyの返り値を、JSON形式でファイルに保存する(非同期)
async function writeKey(key) {
    // ここを埋める（fs.promisesで鍵を保存）
    // JSON.stringify({ key: key.toString("base64") })
    try {
        await fsPromises.writeFile("./key.json", JSON.stringify
            (key));
        console.log("key.json created");
    } catch (e) {
        throw new Error(e);
    }
}

// encrypt64の返り値を、JSON形式でファイルに保存する(非同期)
async function writeEncrypt64(data) {
    // ここを埋める（fs.promisesで暗号データを保存）
    try {
        await fsPromises.writeFile("./data.json", JSON.stringify(data));
        console.log("data.json created");
    } catch (e) {
        throw new Error(e);
    }
}

async function readKey() {
    // ここを埋める（return Promise<鍵>）
    try {
        const key = await fsPromises.readFile("./key.json");
        return Buffer.from(JSON.parse(key));
    } catch (e) {
        throw new Error(e);
    }
}

// ファイルから暗号データを読み込む (非同期)
async function readEncrypt64() {
    // ここを埋める（return Promise<data>）
    try {
        const data = await fsPromises.readFile("./data.json");
        return JSON.parse(data);
    } catch (e) {
        throw new Error(e);
    }
}

// 復号して平文を返す
// data: 暗号文とIV
function decrypt64(data, key) {
    // ここを埋める
    // 暗号化の時と同様に、update関数を繰り返し、最後にfinal関数で終端を取得すると、復号されたデータ
    const decipher = crypto.createDecipheriv("aes-256-cbc", key, Buffer.from(data.iv, "base64"));
    const decryptedText = Buffer.concat([decipher.update(Buffer.from(data.value, "base64")), decipher.final()]).toString("utf8");
    return decryptedText;
}

// 指定の平文を暗号化とBase64エンコードし、後に復号する一連の処理
(async () => {
    // 平文
    const text = "Hello, World!";

    // 暗号化とBase64エンコード
    const key = generateKey();
    const encryptedData = encrypt64(text, key);

    // 鍵と暗号データをJSONで保存
    await writeKey(key);
    await writeEncrypt64(encryptedData);

    console.log("Encrypted Text (Base64):", encryptedData.value);

    // Base64デコードと復号
    const storedKey = await readKey();
    const storedEncryptedData = await readEncrypt64();
    const decryptedText = decrypt64(storedEncryptedData, storedKey);

    console.log("Decrypted Text:", decryptedText);
})();

