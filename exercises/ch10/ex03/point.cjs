// 座標クラス
module.exports = class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    plus(other) {
        return new Point(this.x + other.x, this.y + other.y);
    }

    minus(other) {
        return new Point(this.x - other.x, this.y - other.y);
    }
}