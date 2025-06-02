import { test, expect } from "@playwright/test";
import CommunFunctions from "../../Commun/CommunFunctions";
import SearchCandidates from "../../pages/SearchCandidates";
const candidatedata = require("../Jdd/CandidatData.json");
import fs from "fs";
import path from "path";
const logindata = require("../Jdd/loginData.json");
const dataExpect = require("../ExpectedResult/expectedresult.json");
const communfunction = new CommunFunctions();
const screenshotsDir = path.join(__dirname, "screenshots");

test.describe("Rechercher un candidat", () => {

     // Supprimer le dossier des captures d'écran avant l'exécution des tests de ce bloc
      test.beforeAll(async () => {
        if (fs.existsSync(screenshotsDir)) {
          fs.rmdirSync(screenshotsDir, { recursive: true });
        }
      });
  test.beforeEach(async ({ page }, testInfo) => {
    await page.goto("/web/index.php");
    console.log(
      `✅  Les tests sont lancés sur l’environnement : ${testInfo.project.name}`
    );
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

  test("Rechercher un candidat par nom complet", async ({ page }) => {
    const searchCandidates = new SearchCandidates(page);

    // 1- Connexion
    await CommunFunctions.login(
      page,
      logindata[0].username,
      logindata[0].password
    );

    // 2- Navigation vers la page de gestion des candidats
    await CommunFunctions.goToViewCandidatesPage(page);

    // 3- Recherche du candidat par nom complet
    await searchCandidates.searchCandidatByFullName(
      `${candidatedata.last_name}`
    );


    // 5- Vérification du texte du résultat
    await expect(searchCandidates.ActuelFullNameResult).toContainText(
      `${candidatedata.first_name} ${candidatedata.last_name}`
    );

    // 6- Déconnexion
    await CommunFunctions.logout(page);
  });
});

