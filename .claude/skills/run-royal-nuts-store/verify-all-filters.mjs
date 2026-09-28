import { chromium } from "playwright";
const BASE_URL = process.env.BASE_URL || "http://localhost:5175";
const run = async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  await page.goto(BASE_URL + "/shop", { waitUntil: "networkidle" });

  // Price filter: Rs 2500-5000 band (gift boxes range)
  await page.click('text=Rs. 2,500 \u2013 5,000');
  await page.waitForTimeout(500);
  const priceResultCount = await page.locator('text=/\d+ products?/').first().textContent();
  console.log("Price band 2500-5000 result count:", priceResultCount);

  await page.click('text=All Prices');
  await page.waitForTimeout(400);

  // Weight filter
  await page.click('button:has-text("500g")');
  await page.waitForTimeout(500);
  const weightResultCount = await page.locator('text=/\d+ products?/').first().textContent();
  console.log("Weight 500g result count:", weightResultCount);
  await page.click('button:has-text("Any")');
  await page.waitForTimeout(400);

  // Rating filter
  await page.click('text=4.5+ stars');
  await page.waitForTimeout(500);
  const ratingResultCount = await page.locator('text=/\d+ products?/').first().textContent();
  console.log("Rating 4.5+ result count:", ratingResultCount);

  await browser.close();
};
run().catch((e) => { console.error(e); process.exitCode = 1; });
