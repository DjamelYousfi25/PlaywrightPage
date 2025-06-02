import { test, expect } from "@playwright/test";
import ConnexionPage from "../../pages/ConnexionPage";
import CommunFunctions from "../../Commun/CommunFunctions";
import fs from "fs";
import path from "path";

const logindata = require("../Jdd/loginData.json");
const dataExpect = require("../ExpectedResult/expectedresult.json");
const screenshotsDir = path.join(__dirname, "screenshots");

test.describe("Vérification de la connexion", () => {
  // Si tu veux supprimer les anciennes captures avant les tests, décommente ici :
  /*
  test.beforeAll(async () => {
    if (fs.existsSync(screenshotsDir)) {
      fs.rmdirSync(screenshotsDir, { recursive: true });
    }
  });
  */

  test.beforeEach(async ({ page }, testInfo) => {
    await page.goto("/web/index.php");
    console.log(`✅ Test lancé sur : ${testInfo.project.name}`);
  });

  test.afterEach(async ({ page }, testInfo) => {
    if (testInfo.status === "failed") {
      console.log(`❌ Test échoué : ${testInfo.title} — capture d'écran...`);
      if (!fs.existsSync(screenshotsDir)) {
        fs.mkdirSync(screenshotsDir, { recursive: true });
      }

      const safeTitle = testInfo.title.replace(/[^a-zA-Z0-9_\-]/g, "_");
      const screenshotPath = path.join(
        screenshotsDir,
        `${safeTitle}-${Date.now()}.png`
      );
      await page.screenshot({ path: screenshotPath, fullPage: true });
    }

    await page.close();
  });

  test("Connexion réussie avec identifiants valides", async ({ page }) => {
    const connexionPage = new ConnexionPage(page);

    await connexionPage.login(logindata[0].username, logindata[0].password);

    await expect(connexionPage.Time_at_Work_label).toContainText(
      dataExpect.pages.connexion_page.Time_at_Work_label
    );
  });

  test("Connexion échouée avec identifiants invalides", async ({ page }) => {
    const connexionPage = new ConnexionPage(page);

    await connexionPage.login(logindata[1].username, logindata[1].password);

    await expect(connexionPage.errorLogin).toContainText(
      dataExpect.pages.connexion_page.Connexion_error,
      { timeout: 10000 }
    );
  });
});
