export async function retryWithExponentialBackoff(func) {
    let attempt = 0;

    async function execute() {
        console.log(attempt)
        try {
            const result = await func();
            console.log(result)

            if (result === "ok") {
                console.log("success")
                return;
            } else if (result === "timeout") {
                alert("timeout")
                return;
            }
        } catch (e) {
            // エラーが発生した場合もリトライを続ける
            console.log("retry")
        }

        attempt++;
        if (attempt > 5) {
            console.log("failure")
            return;
        }

        const delay = Math.pow(2, attempt) * 1000;
        setTimeout(execute, delay);
    }

    execute();
}