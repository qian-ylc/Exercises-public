function f(input) {
    const f = new Function(`return "Hello, " + ${input}`);
    console.log(f());
}

// eval()と似ている、`return "Hello, " + ${input}`は、直接に実行されるため、
// 不正なコードが実行されるリスクがある