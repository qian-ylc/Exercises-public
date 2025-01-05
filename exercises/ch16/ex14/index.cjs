// jlmpで画像のピクセル操作
const Jimp = require('jimp').Jimp;
const { Worker, workerData } = require('worker_threads');

async function main() {
    // 画像を読み込む、画像データを取得
    const image = await Jimp.read('./1.png');
    if (!image) {
        console.log("no image");
        return;
    }
    const width = image.bitmap.width;
    const height = image.bitmap.height;
    // console.log(width, height);
    const data = image.bitmap.data;

    // Workerを定義し、workerDataを渡す
    let worker = new Worker('./worker.cjs', { workerData: { data, width, height } });
    worker.on('message', (outputData) => {
        // 受け取ったデータ outputData を使って出力画像を生成
        const outputImage = new Jimp({ width, height, data: outputData });
        outputImage.write('./output.png', (err) => {
            if (err) throw err;
            console.log('output.png');
        });
    });

    worker.on('error', (err) => {
        console.error('Worker error:', err);
    });

    worker.on('exit', (code) => {
        if (code !== 0) {
            console.error(`Worker stopped with exit code ${code}`);
        }
    });
}

main();