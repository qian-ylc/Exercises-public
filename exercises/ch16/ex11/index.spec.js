import { expect, test } from "@playwright/test";

test(" '/ 'が GET されたとき以下の HTML を返却する", async ({ page }) => {
    await page.goto("localhost:8000");
    // スクリプトが正常にロードされることを確認
    const content = await page.content();
    expect(content).toContain('<form action=\"/greeting\" method=\"POST\">');

})

test.describe("nameとgreeting の内容をボディに含む HTML を返却", () => {
    test("正常系", async ({ page }) => {
        await page.goto("localhost:8000");
        await page.fill('input[name="name"]', 'John');
        await page.fill('input[name="greeting"]', 'Hellooo');
        await page.click('button[type="submit"]');

        const content = await page.content();
        expect(content).toContain('<h1>Hellooo, John!</h1>');
    })
    test("入力なし", async ({ page }) => {
        await page.goto("localhost:8000");
        await page.click('button[type="submit"]');

        const content = await page.content();
        expect(content).toContain('<h1>Hello, Guest!</h1>');
    })
})

test("非対応のパスとメソッドの組み合わせでは、404を返す", async ({ page }) => {
    const response = await page.goto('http://localhost:8000/nonexistent');
    expect(response.status()).toBe(404);
})


