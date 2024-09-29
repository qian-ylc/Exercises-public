import { expect, test } from "@playwright/test";

test("カテゴリがすべての場合、全ての商品が表示される", async ({ page }) => {
    await page.goto("http://127.0.0.1:5500/exercises/ch15.01-03/ex14/index.html");
    await page.getByTestId("select").selectOption({ label: "すべて" });

    // const ul = page.getByRole("list");
    // const liElements = await ul.getByRole("listitem").all();
    // expect(liElements).toHaveLength(3);

    const food1 = page.getByTestId("food1")
    const stationery1 = page.getByTestId("stationery1");
    const stationery2 = page.getByTestId("stationery2");
    await expect(food1).toBeVisible();
    await expect(stationery1).toBeVisible();
    await expect(stationery2).toBeVisible();
});

test("カテゴリが食品の場合、食品の商品が表示される", async ({ page }) => {
    await page.goto("http://127.0.0.1:5500/exercises/ch15.01-03/ex14/index.html");
    await page.getByTestId("select").selectOption({ label: "食品" });

    const food1 = page.getByTestId("food1")
    const stationery1 = page.getByTestId("stationery1");
    const stationery2 = page.getByTestId("stationery2");
    await expect(food1).toBeVisible();
    await expect(stationery1).not.toBeVisible();
    await expect(stationery2).not.toBeVisible();
});

test("カテゴリが文房具の場合、文房具の商品が表示される", async ({ page }) => {
    await page.goto("http://127.0.0.1:5500/exercises/ch15.01-03/ex14/index.html");
    await page.getByTestId("select").selectOption({ label: "文房具" });

    const food1 = page.getByTestId("food1")
    const stationery1 = page.getByTestId("stationery1");
    const stationery2 = page.getByTestId("stationery2");
    await expect(food1).not.toBeVisible();
    await expect(stationery1).toBeVisible();
    await expect(stationery2).toBeVisible();
});