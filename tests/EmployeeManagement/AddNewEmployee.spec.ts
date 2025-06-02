import { test, expect } from "@playwright/test";
import CommunFunctions from "../../Commun/CommunFunctions";
import EmployeePage from "../../pages/EmployeePage";
import fs from "fs";
import path from "path";

const candidatedata = require("../Jdd/CandidatData.json");
const logindata = require("../Jdd/loginData.json");
const dataExpect = require("../ExpectedResult/expectedresult.json");
const screenshotsDir = path.join(__dirname, "screenshots");

test.describe("Employee management", () => {
  // Si besoin, décommente pour nettoyer les screenshots avant tous les tests
  /*
  test.beforeAll(async () => {
    if (fs.existsSync(screenshotsDir)) {
      fs.rmdirSync(screenshotsDir, { recursive: true });
    }
  });
  */

  test.beforeEach(async ({ page }, testInfo) => {
    console.log(`✅ Tests lancés sur : ${testInfo.project.name}`);
    await page.goto("/web/index.php");
  });

  test.afterEach(async ({ page }, testInfo) => {
    if (testInfo.status === "failed") {
      console.log(`❌ Test échoué : ${testInfo.title}. Capture d'écran...`);
      if (!fs.existsSync(screenshotsDir)) {
        fs.mkdirSync(screenshotsDir, { recursive: true });
      }

      // Sécuriser le nom du fichier de screenshot
      const safeTitle = testInfo.title.replace(/[^a-zA-Z0-9_\-]/g, "_");
      const screenshotPath = path.join(
        screenshotsDir,
        `${safeTitle}-${Date.now()}.png`
      );
      await page.screenshot({ path: screenshotPath, fullPage: true });
    }
    await page.close();
  });

  test("Ajouter un nouveau employé avec certains champs", async ({ page }) => {
    const employeePage = new EmployeePage(page);

    // 1 - Connexion avec la fonction commune Login
    await CommunFunctions.login(
      page,
      logindata[0].username,
      logindata[0].password
    );

    // 2 - Aller sur la page de gestion des employés
    await CommunFunctions.goToViewEmployeePage(page);

    // 3 - Ajouter un nouvel employé
    await employeePage.addNewEmployee(
      candidatedata.first_name,
      candidatedata.last_name,
      candidatedata.last_name, // Note : dernier paramètre vide string '' remplacé par last_name (à vérifier)
      ""
    );

    await employeePage.FullEmployeenamecheck.waitFor();

    await expect(employeePage.FullEmployeenamecheck).toContainText(
      dataExpect.pages.AddNewCandidatePage.CheckCandidateName,
      { timeout: 10000 }
    );

    await CommunFunctions.logout(page);
  });
});
