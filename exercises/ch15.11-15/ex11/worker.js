// canvas.getContext('2d')はpostMessage()で渡すことができないため、
// OffscreenCanvasを使う https://ics.media/entry/19043/

onmessage = function (event) {
    const MAX_COUNT = 8;
    // line style
    let colors = ['gray', 'navy', 'purple', 'brown',
        'red', 'orange', 'yellowgreen', 'skyblue'];
    let widths = [5, 4, 3, 2, 2, 1, 1, 0.5];

    let tm = [
        [[0, 1 / 2, 0], [1 / 2, 0, 0], [0, 0, 1]],
        [[1 / 2, 0, 0], [0, 1 / 2, 1 / 2], [0, 0, 1]],
        [[1 / 2, 0, 1 / 2], [0, 1 / 2, 1 / 2], [0, 0, 1]],
        [[0, -1 / 2, 1], [-1 / 2, 0, 1 / 2], [0, 0, 1]]
    ]

    let E = [[1, 0, 0], [0, 1, 0], [0, 0, 1]];
    const offscreenCanvas = event.data.canvas;
    offscreenCanvas.width = 800;
    offscreenCanvas.height = 800;
    const ctx = offscreenCanvas.getContext('2d');

    // n: ループ回数, m: 変換行列E
    function hilbert(n, m) {
        if (n > 0) {
            tm.forEach(mm => hilbert(n - 1, mat_mul(m, mm)));
        } else {
            [[0.25, 0.25], [0.25, 0.75], [0.75, 0.75], [0.75, 0.25]]
                .map(p => affine_transform(m, p))
                .map(p => [p[0] * offscreenCanvas.width, p[1] * offscreenCanvas.height])
                .forEach(p => ctx.lineTo(p[0], p[1]));
        }
    }

    function affine_transform(m, p) {
        return [m[0][0] * p[0] + m[0][1] * p[1] + m[0][2],
        m[1][0] * p[0] + m[1][1] * p[1] + m[1][2]];
    }

    function mat_mul(m0, m1) {
        return [[m0[0][0] * m1[0][0] + m0[0][1] * m1[1][0] + m0[0][2] * m1[2][0],
        m0[0][0] * m1[0][1] + m0[0][1] * m1[1][1] + m0[0][2] * m1[2][1],
        m0[0][0] * m1[0][2] + m0[0][1] * m1[1][2] + m0[0][2] * m1[2][2]],
        [m0[1][0] * m1[0][0] + m0[1][1] * m1[1][0] + m0[1][2] * m1[2][0],
        m0[1][0] * m1[0][1] + m0[1][1] * m1[1][1] + m0[1][2] * m1[2][1],
        m0[1][0] * m1[0][2] + m0[1][1] * m1[1][2] + m0[1][2] * m1[2][2]],
        [m0[2][0] * m1[0][0] + m0[2][1] * m1[1][0] + m0[2][2] * m1[2][0],
        m0[2][0] * m1[0][1] + m0[2][1] * m1[1][1] + m0[2][2] * m1[2][1],
        m0[2][0] * m1[0][2] + m0[2][1] * m1[1][2] + m0[2][2] * m1[2][2]]];
    }

    function drawHilbert(i) {
        ctx.beginPath();
        ctx.lineWidth = widths[i];
        ctx.strokeStyle = colors[i];
        // i: ループ回数, E: 変換行列
        hilbert(i, E);
        ctx.stroke();
    }

    function doLoop(maxCount, i) {
        if (i < maxCount) {
            drawHilbert(i);
            setTimeout(function () {
                doLoop(maxCount, ++i)
            }, 800);
        } else {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            doLoop(MAX_COUNT, 0);
        }
    }
    doLoop(MAX_COUNT, 0);
}

