// Life Game のルールに従ってセルを更新する

// 50 x 50 の盤面とする
const ROWS = 50;
const COLS = 50;
// 1セルのサイズ
const RESOLUTION = 10;

export function updateGrid(grid) {
    // 新しいグリッドを作成
    const nextGrid = grid.map((arr) => [...arr]);

    for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLS; col++) {
            // 周囲のセルの生存数を数えて nextGrid[row][col] に true or false を設定する (実装してね)
            let neighbors = [];
            if (row === 0 || row === ROWS - 1 || col === 0 || col === COLS - 1) {
                // 四角
                if (row === 0 && col === 0) {
                    neighbors = [grid[row][col + 1], grid[row + 1][col], grid[row + 1][col + 1]];
                }
                else if (row === 0 && col === COLS - 1) {
                    neighbors = [grid[row][col - 1], grid[row + 1][col - 1], grid[row + 1][col]];
                }
                else if (row === ROWS - 1 && col === 0) {
                    neighbors = [grid[row - 1][col], grid[row - 1][col + 1], grid[row][col + 1]];
                }
                else if (row === ROWS - 1 && col === COLS - 1) {
                    neighbors = [grid[row - 1][col - 1], grid[row - 1][col], grid[row][col - 1]];
                }
                else if (row === 0) {
                    neighbors = [grid[row][col - 1], grid[row][col + 1], grid[row + 1][col - 1], grid[row + 1][col], grid[row + 1][col + 1]];
                }
                else if (row === ROWS - 1) {
                    neighbors = [grid[row - 1][col - 1], grid[row - 1][col], grid[row - 1][col + 1], grid[row][col - 1], grid[row][col + 1]];
                }
                else if (col === 0) {
                    neighbors = [grid[row - 1][col], grid[row - 1][col + 1], grid[row][col + 1], grid[row + 1][col], grid[row + 1][col + 1]];
                }
                else if (col === COLS - 1) {
                    neighbors = [grid[row - 1][col - 1], grid[row - 1][col], grid[row][col - 1], grid[row + 1][col - 1], grid[row + 1][col]];
                }
            }
            else {
                neighbors = [grid[row - 1][col - 1], grid[row - 1][col], grid[row - 1][col + 1], grid[row][col - 1], grid[row][col + 1], grid[row + 1][col - 1], grid[row + 1][col], grid[row + 1][col + 1]];
            }
            // trueを数える
            let alive = neighbors.filter((cell) => cell).length;

            if (alive === 3) {
                nextGrid[row][col] = true;
            } else if (alive < 2 || alive > 3) {
                nextGrid[row][col] = false;
            } else {
                nextGrid[row][col] = grid[row][col];
            }



        }
    }
    return nextGrid;
}