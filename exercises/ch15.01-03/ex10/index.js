const div = document.getElementById("editor-front");
div.addEventListener("click", () => {
    const input = document.querySelector("input");
    input.focus();
    div.style.backgroundColor = "silver";
    input.addEventListener("blur", () => {
        div.style.backgroundColor = "white";
    });
});

const input = document.querySelector("input");
input.addEventListener("input", () => {
    div.innerHTML = input.value;
});