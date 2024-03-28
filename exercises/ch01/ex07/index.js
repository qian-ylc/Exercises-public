class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    distance() {
        return Math.sqrt(
            this.x * this.x + this.y * this.y
        );
    }
    add(a) {
        return (
            new Point(this.x + a.x, this.y + a.y)
        )
    }
}

export { Point }