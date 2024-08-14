export function* counterGen() {
    let count = 1;
    while (true) {
        try {
            yield count;
            count++;
        } catch (e) {
            console.log("reset");
            count = 0;
        }
    }
}