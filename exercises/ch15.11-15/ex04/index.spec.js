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
        await page.goto("/ch15.11-15/ex04");
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
    test("あるタブでの変更が他のタブにも自動的に反映される", async ({ page }) => {
        const page2 = await page.context().newPage();
        await page2.goto("/ch15.11-15/ex04");
        await addToDo(page, "todo1");
        await addToDo(page, "todo2");
        await checkToDo(page, 0);
        await deleteToDo(page, 0);
        expect(await countToDos(page2)).toBe(1);
        expect(await queryToDo(page2, 0).textContent()).toContain("todo2");
    });
})
