const worker = new Worker("worker.js");

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
        const workerWidth = img.width;
        const workerHeight = img.height;

        originalCtx.drawImage(img, 0, 0);
        const imageData = originalCtx.getImageData(0, 0, img.width, img.height);
        const data = imageData.data;

        // ガウシアンフィルタをworkerで実行、結果を受け取る
        worker.postMessage({ data, workerWidth, workerHeight });
        worker.onmessage = (event) => {
            const outputData = event.data;
            const outputImageData = new ImageData(outputData, img.width, img.height);
            filteredCtx.putImageData(outputImageData, 0, 0);
        };
    });

    reader.readAsDataURL(file);

    // ページ内に動くオブジェクトを配置し、画像変換中にメインスレッドがブロックされていないことを確認
    // タイマー msまでの時間を表示
    if (!document.querySelector(".timer")) {
        const timer = document.createElement("div");
        timer.className = "timer";
        timer.textContent = "0";
        console.log(timer)
        document.body.appendChild(timer);
        let ms = 0;
        setInterval(() => {
            ms += 100;
            timer.textContent = ms;
        }, 100);
    }
});




