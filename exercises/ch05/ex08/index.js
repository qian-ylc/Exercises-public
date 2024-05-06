let x = 0;

for (let i = 1; i <= 5; i++) {
    x = i;
    debugger
    try {
        throw Error();
    } catch {
        break;
    } finally {
        debugger
        continue;
    }
}

console.log(x);
