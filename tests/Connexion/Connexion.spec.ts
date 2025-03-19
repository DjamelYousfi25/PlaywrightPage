import { test, expect } from "@playwright/test";
import { describe } from "node:test";
import ConnexionPage from "../../pages/ConnexionPage";
import CommunFunctions from "../../Commun/CommunFunctions";
import fs from "fs";
import path from "path";
const logindata = require("../Jdd/loginData.json");
const dataExpect = require("../ExpectedResult/expectedresult.json");
const screenshotsDir = path.join(__dirname, "screenshots");

describe("Vérification de la connexion", () => {

    // Supprimer le dossier des captures d'écran avant l'exécution des tests de ce bloc
    test.beforeAll(async () => {
      if (fs.existsSync(screenshotsDir)) {
        fs.rmdirSync(screenshotsDir, { recursive: true });
      }
    });

  test.beforeEach(async ({ page }) => {
  await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php");
});

test.afterEach(async ({ page }, testInfo) => {
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


  const communfunction = new CommunFunctions();

  test("Test de connexion réussie", async ({ page }) => {
    const connexionPage = new ConnexionPage(page);

    // Connexion avec des identifiants valides
    await connexionPage.login(logindata[0].username, logindata[0].password);

    // Vérification du texte attendu après connexion
    await expect(connexionPage.Time_at_Work_label).toContainText(
      dataExpect.pages.connexion_page.Time_at_Work_label
    );
  });

  test("Test de connexion échouée", async ({ page }) => {
    const connexionPage = new ConnexionPage(page);

    // Connexion avec des identifiants incorrects
    await connexionPage.login(logindata[1].username, logindata[1].password);


    // Vérification du message d'erreur
    await expect(connexionPage.errorLogin).toContainText(
      dataExpect.pages.connexion_page.Connexion_error,
      {
        timeout: 10000,
      }
    );
  });
});
