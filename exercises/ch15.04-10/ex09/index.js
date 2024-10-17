document.getElementById("image").addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (!file) {
        return;
    }

    const img = new Image();
    const reader = new FileReader();

    reader.addEventListener("load", (e) => {
        img.src = e.target.result;
    });

    img.addEventListener("load", () => {
        const originalCanvas = document.getElementById("original");
        const filteredCanvas = document.getElementById("filtered");
        const originalCtx = originalCanvas.getContext("2d");
        const filteredCtx = filteredCanvas.getContext("2d");

        originalCanvas.width = img.width;
        originalCanvas.height = img.height;
        filteredCanvas.width = img.width;
        filteredCanvas.height = img.height;

        originalCtx.drawImage(img, 0, 0);

        const imageData = originalCtx.getImageData(0, 0, img.width, img.height);
        const data = imageData.data;

        // グレースケールへの変換 (RGB を足して平均を取っている)
        //
        // ガウシアンフィルタを実装する場合はこの周辺のコードを変更しなさい
        // imageData の中身はそのままに別の配列に結果を格納するとよい
        // ```js
        // const outputData = new Uint8ClampedArray(imageData.data.length);
        //
        // // TODO: ここで imageData.data を参照して outputData に結果を格納
        //
        // const outputImageData = new ImageData(outputData, img.width, img.height);
        // filteredCtx.putImageData(outputImageData, 0, 0);
        // ```

        // https://zenn.dev/inaniwaudon/scraps/4c50abe16011a1
        // 5x5のガウシアンフィルタ
        // data: 入力画像データ
        // outputData: 出力画像データ
        // radius = 2: ガウシアンフィルタの半径

        const radius = 2;
        const kernel = createKernel(radius);
        const blockSize = filteredCanvas.width / 1;
        const height = filteredCanvas.height;
        const width = filteredCanvas.width;
        let outputData = new Uint8ClampedArray(data.length);

        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                let [r, g, b, a] = [0, 0, 0, 0];

                // kyとkxでカーネル内で計算する位置を指定
                for (let ky = -radius; ky <= radius; ky++) {
                    const offsetY = Math.max(0, Math.min(y + ky, height - 1));
                    const yi = ky + radius; // カーネル内のy座標

                    for (let kx = -radius; kx <= radius; kx++) {
                        const offsetX = Math.max(0, Math.min(x + kx, width - 1));
                        const xi = kx + radius; // カーネル内のx座標
                        // カーネルの値と画像の値を掛けて合計する
                        const index = (offsetY * width + offsetX) * 4;

                        r += data[index] * kernel[yi][xi];
                        g += data[index + 1] * kernel[yi][xi];
                        b += data[index + 2] * kernel[yi][xi];
                        a += data[index + 3] * kernel[yi][xi];
                    }
                }

                // 出力画像データに書き込む
                const index = (y * blockSize + x) * 4;
                outputData[index] = Math.min(r, 255);
                outputData[index + 1] = Math.min(g, 255);
                outputData[index + 2] = Math.min(b, 255);
                outputData[index + 3] = Math.min(a, 255);
            }
        }

        const outputImageData = new ImageData(outputData, img.width, img.height);
        filteredCtx.putImageData(outputImageData, 0, 0);
    });

    reader.readAsDataURL(file);
});

const createKernel = (radius) => {
    const kernel = [];
    const sigma = radius / 3;
    const coefficient = 1 / (2 * Math.PI * sigma ** 2);

    for (let y = -radius; y <= radius; y++) {
        const row = [];
        for (let x = -radius; x <= radius; x++) {
            const value =
                coefficient * Math.exp(-(x ** 2 + y ** 2) / (2 * sigma ** 2));
            row.push(value);
        }
        kernel.push(row);
    }
    return kernel;
};

