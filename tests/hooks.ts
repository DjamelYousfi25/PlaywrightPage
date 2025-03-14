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

//Ici le beforeAll lit toutes les sceenshot existant et les supprime
beforeAll(async () => {

  if (fs.existsSync(screenshotsDir)) {
    // Lire tous les fichiers du dossier
    const files = fs.readdirSync(screenshotsDir);

    // Supprimer chaque fichier
    for (const file of files) {
      const filePath = path.join(screenshotsDir, file);
      fs.unlinkSync(filePath); // Supprimer le fichier
    }

  } else {

  }
});

//Exécuté avant chaque test du groupe
beforeEach(async ({ page }) => {
  
  await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php");
});
afterEach(async ({ page }, testInfo) => {
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

  
  }
  await page.close();
});

// Exporter les hooks 
module.exports = { beforeAll, afterAll, beforeEach, afterEach };
