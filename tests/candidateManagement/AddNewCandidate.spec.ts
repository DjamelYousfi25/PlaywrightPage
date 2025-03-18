import { test, expect } from "@playwright/test";
import CommunFunctions from "../../Commun/CommunFunctions";
import AddNewCandidatePage from "../../pages/AddNewCandidatePage";
import fs from "fs";
import path from "path";
const candidatedata = require("../Jdd/CandidatData.json");
const logindata = require("../Jdd/loginData.json");
const dataExpect = require("../ExpectedResult/expectedresult.json");
const screenshotsDir = path.join(__dirname, "screenshots");

test.describe("Gestion des candidats", () => {
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

  test("Ajouter un nouveau candidat avec certains champs", async ({ page }) => {
    const addNewCandidatePage = new AddNewCandidatePage(page);

    //1- Je me connecte à mon appli en utilisant la fonction commune Login
    await CommunFunctions.login(
      page,
      logindata[0].username,
      logindata[0].password
    );

    //2-J e vais sur la page de Gestion de candidats
    await CommunFunctions.goToViewCandidatesPage(page);

    //3- je rajoute un nouveau candidat
    await addNewCandidatePage.addNewCandidate(
      candidatedata.first_name,
      candidatedata.last_name,
      candidatedata.email,
      candidatedata.number_phone
    );

    await page.waitForTimeout(5000); // 5000 millisecondes = 5 secondes
    await expect(addNewCandidatePage.fullNameCheck).toContainText(
      dataExpect.pages.AddNewCandidatePage.CheckCandidateName
    );
    await CommunFunctions.logout(page);
  });

  test("Vérifier que les trois champs sont obligatoire ", async ({ page }) => {
    const addNewCandidatePage = new AddNewCandidatePage(page);

    //1- Je me connecte à mon appli en utilisant la fonction commune Login
    await CommunFunctions.login(
      page,
      logindata[0].username,
      logindata[0].password
    );

    //2-J e vais sur la page de Gestion de candidats
    await CommunFunctions.goToViewCandidatesPage(page);

    //3- je rajoute un nouveau candidat
    await addNewCandidatePage.addNewCandidate(
      "",
      "",
      "",
      candidatedata.number_phone
    );
    await addNewCandidatePage.RequiredEmail.waitFor();
    await expect(addNewCandidatePage.RequiredFirstName).toContainText(
      "Required"
    );
    await expect(addNewCandidatePage.RequiredLastName).toContainText(
      "Required"
    );
    await expect(addNewCandidatePage.RequiredEmail).toContainText("Required");
    await CommunFunctions.logout(page);
  });
});
