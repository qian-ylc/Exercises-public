export let obj = {
    r: 1,
    theta: 0,
    get x() { return this.r * Math.cos(this.theta) },
    get y() { return this.r * Math.sin(this.theta) },
    set x(newvaluex) {
        if (isNaN(newvaluex)) { throw new Error("x is NaN") }
        this.r = newvaluex / Math.cos(this.theta)
    },
    set y(newvaluey) {
        if (isNaN(newvaluey)) { throw new Error("y is NaN") }
        this.r = newvaluey / Math.sin(this.theta)
    },
}