import { expect, test } from "@playwright/test";

/**
 * @param {import("@playwright/test").Page} page
 * @param {string} todo
 */
async function addToDo(page, todo) {
    await page.getByRole("textbox").fill(todo);
    await page.getByRole("button", { name: "Add" }).click();
}

/**
 * @param {import("@playwright/test").Page} page
 * @param {number} index
 */
async function checkToDo(page, index) {
    await page.getByRole("listitem").nth(index).getByRole("checkbox").check();
}

/**
 * @param {import("@playwright/test").Page} page
 * @param {number} index
 */
async function deleteToDo(page, index) {
    await page
        .getByRole("listitem")
        .nth(index)
        .getByRole("button", { name: "削除" })
        .click();
}

/**
 * @param {import("@playwright/test").Page} page
 */
async function countToDos(page) {
    return await page.getByRole("listitem").count();
}

/**
 * @param {import("@playwright/test").Page} page
 * @param {number} index
 */
function queryToDo(page, index) {
    return page.getByRole("listitem").nth(index);
}

test.describe("リロードしても、todo-listの内容が維持される", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto("/ch15.11-15/ex05");
    });
    test("何もToDoを追加していない場合、リロードしてもtodo-listは空のまま", async ({ page }) => {
        await page.reload();
        expect(await countToDos(page)).toBe(0);
    });
    test("リロードしても、todo-listの内容が維持される", async ({ page }) => {
        await addToDo(page, "todo1");
        await addToDo(page, "todo2");
        await checkToDo(page, 0);
        await deleteToDo(page, 0);
        await page.reload();
        expect(await countToDos(page)).toBe(1);
        expect(await queryToDo(page, 0).textContent()).toContain("todo2");
    });
    test("一度閉じても、todo-listの内容が維持される", async ({ page }) => {
        await addToDo(page, "todo1");
        await addToDo(page, "todo2");
        await checkToDo(page, 0);
        await deleteToDo(page, 0);
        await page.close();
        page = await page.context().newPage();
        await page.goto("/ch15.11-15/ex05");
        expect(await countToDos(page)).toBe(1);
        expect(await queryToDo(page, 0).textContent()).toContain("todo2");
    });
})
