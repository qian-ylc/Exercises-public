import { expect, test } from "@playwright/test";

test.describe('inline-circle border-color', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/ch15.04-10/ex05');
    });

    test('border-colorの値に応じて枠の色を変更', async ({ page }) => {
        await page.evaluate(() => {
            const circle = document.querySelector('inline-circle');
            circle.setAttribute('border-color', 'red');
        });
        const borderColor = await page.$eval('inline-circle', (circle) => circle.getAttribute('border-color'));
        expect(borderColor).toBe('red');

    });
});