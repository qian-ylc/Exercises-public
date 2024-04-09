const equal = (x, y) => {
    if (Math.round(x * 10) / 10 === Math.round(y * 10) / 10) {
        return true
    } else {
        return false
    }
}

export { equal }