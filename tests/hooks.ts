const fs = require("fs");
const path = require("path");

const {
  beforeAll,
  afterAll,
  beforeEach,
  afterEach,
} = require("@playwright/test");
const screenshotsDir = path.join(__dirname, "screenshots");
console.log(screenshotsDir);

/**
 * Hook exécuté après tous les tests.
 */
afterAll(async () => {
  // Nettoyage après tous les tests
});

/**
 * Hook exécuté avant tous les tests.
 */
beforeAll(async () => {

});

/**
 * Hook exécuté avant chaque test.
 */
beforeEach(async ({ page }) => {
  await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php");
});

/**
 * Hook exécuté après chaque test.
 */
afterEach(async ({ page }, testInfo) => {
  if (testInfo.status === "failed") {
    console.log(`Test failed: ${testInfo.title}. Capturing screenshot...`);
    if (!fs.existsSync(screenshotsDir)) {
      fs.mkdirSync(screenshotsDir, { recursive: true });
    }

    const screenshotPath = path.join(
      screenshotsDir,
      `${testInfo.title}-${Date.now()}.png`
    );
    await page.screenshot({
      path: screenshotPath,
      fullPage: true,
    });
  }
  await page.close();
});

// Exporter les hooks
module.exports = { beforeAll, afterAll, beforeEach, afterEach };
