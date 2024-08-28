window.addEventListener('beforeunload', (e) => {
    e.preventDefault()
})

window.addEventListener("close", (event) => {
    alert("Goodbye!")
});

console.log("hello")