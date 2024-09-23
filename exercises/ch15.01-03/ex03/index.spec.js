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
 */
async function countToDos(page) {
    return await page.getByRole("listitem").count();
}

// playwrightでintegrity属性を変更？

// index1.html: index.jsのintegrity値
test("適切なintegrity値の場合はロードされる", async ({ page }) => {
    await page.goto("/ch15.01-03/ex03/index1.html");
    // スクリプトが正常にロードされることを確認
    await addToDo(page, "質問表に質問を記載する");
    expect(await countToDos(page)).toBe(1);
})

// index2.html: integrity値が不正
test("不正なintegrity値の場合はロードされない", async ({ page }) => {
    await page.goto("/ch15.01-03/ex03/index2.html?");
    // スクリプトが正常にロードされないことを確認
    await addToDo(page, "質問表に質問を記載する");
    expect(await countToDos(page)).toBe(0);
});