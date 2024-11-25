// ヒルベルト曲線
// https://iio-lab.blogspot.com/2020/05/drawing-hilbert-curve-by-javascript.html からのアルゴリズム
// workerがDOMを操作することはできない、
// ctx = canvas.getContext('2d')はpostMessage()で渡すことができないため、
// OffscreenCanvasを使う https://ics.media/entry/19043/

let canvas = document.querySelector('canvas');
// Canvas要素の描画コントロールをOffscreenCanvasに委譲する
const offscreenCanvas = canvas.transferControlToOffscreen();
const worker = new Worker('worker.js');
// OffscreenCanvasをworkerに渡す
worker.postMessage({ canvas: offscreenCanvas }, [
    offscreenCanvas
]);

