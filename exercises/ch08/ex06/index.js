const m = function (...arg) { // arg -> ...arg
    console.log(arg[1]);
};
m("a", "b");

const marrow = (...arg) => {
    console.log(arg[1]);
}
marrow("a", "b");
