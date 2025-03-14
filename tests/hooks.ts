const fs = require("fs");
const path = require("path");

const {
  beforeAll,
  afterAll,
  beforeEach,
  afterEach,
} = require("@playwright/test");
const screenshotsDir = path.join(__dirname, "screenshots");

// Hook exécuté après tous les tests
afterAll(async () => {

});

beforeAll(async () => {


  if (fs.existsSync(screenshotsDir)) {
    // Lire tous les fichiers du dossier
    const files = fs.readdirSync(screenshotsDir);

    // Supprimer chaque fichier
    for (const file of files) {
      const filePath = path.join(screenshotsDir, file);
      fs.unlinkSync(filePath); // Supprimer le fichier
    }

    console.log("Tous les screenshots ont été supprimés.");
  } else {

  }
});

beforeEach(async ({ page }) => {
  
  console.log("Exécuté avant chaque test du groupe");
  await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php");
});
afterEach(async ({ page }, testInfo) => {
  console.log("Exécuté après chaque test du groupe");
  if (testInfo.status === "failed") {
    console.log(`Test failed: ${testInfo.title}. Capturing screenshot...`);

      if (!fs.existsSync(screenshotsDir)) {
        fs.mkdirSync(screenshotsDir, { recursive: true });
      }

    // Prendre une capture d'écran et la sauvegarder dans un fichier
     const screenshotPath = path.join(
       screenshotsDir,
       `${testInfo.title}-${Date.now()}.png`
     );
    await page.screenshot({
      path: screenshotPath,
      fullPage: true,
    });

    console.log(`Screenshot saved to: ${screenshotPath}`);
  }
  await page.close();
});

// Exporter les hooks si nécessaire
module.exports = { beforeAll, afterAll, beforeEach, afterEach };
