const sum = [
    data[i],
    data[i + 1],
    data[i + 2],
    data[i + 3],
];
const w = img.width;
const x = i / 4 % w;
const y = Math.floor(i / 4 / w);
const index = (x + y * w) * 4;
// 5x5のガウシアンフィルタ
const filter = [
    index - 4 * w - 4,
    index - 4 * w,
    index - 4 * w + 4,
    index - 4,
    index,
    index + 4,
    index + 4 * w - 4,
    index + 4 * w,
    index + 4 * w + 4,
];
for (let j = 0; j < filter.length; j++) {
    if (filter[j] < 0 || filter[j] >= data.length) {
        continue;
    }
    sum[0] += data[filter[j]];
    sum[1] += data[filter[j] + 1];
    sum[2] += data[filter[j] + 2];
    sum[3] += data[filter[j] + 3];
}
data[i] = sum[0] / 9;
data[i + 1] = sum[1] / 9;
data[i + 2] = sum[2] / 9;
data[i + 3] = sum[3] / 9;