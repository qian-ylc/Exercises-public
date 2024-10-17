let minutehand = document.querySelector(".minutehand"); // 分針の要素を取得する。
// 分針の下に秒針を描画する。
let line = document.createElementNS("http://www.w3.org/2000/svg", "line");
line.setAttribute("x1", "50");
line.setAttribute("y1", "50");
line.setAttribute("x2", "50");
line.setAttribute("y2", "15");
line.setAttribute("stroke", "black");
line.setAttribute("stroke-width", "1");
line.setAttribute("class", "secondhand");
minutehand.parentNode.appendChild(line); // 分針の親要素に追加する。

(function updateClock() { // SVG時計の画像を更新して現在時刻を表示する。
    let now = new Date(); // 現在時刻。
    let sec = now.getSeconds(); // 秒。
    let min = now.getMinutes() + sec / 60; // 小数部を持つ分。
    let hour = (now.getHours() % 12) + min / 60; // 小数部を持つ時。
    let minangle = min * 6; // 1分あたり6度。
    let hourangle = hour * 30; // 1時間あたり30度。
    // 時計の針のSVG要素を取得する。
    let minhand = document.querySelector("#clock .minutehand");
    let hourhand = document.querySelector("#clock .hourhand");
    let secondhand = document.querySelector("#clock .secondhand");
    // SVG属性を設定して、時計盤の中で回転する。秒針の回転を追加
    minhand.setAttribute("transform", `rotate(${minangle},50,50)`);
    hourhand.setAttribute("transform", `rotate(${hourangle},50,50)`);
    secondhand.setAttribute("transform", `rotate(${sec * 6},50,50)`);
    // 1秒後にこの関数を再度実行する。
    setTimeout(updateClock, 1000);
}()); // ここで関数を即座に実行していることに注意。