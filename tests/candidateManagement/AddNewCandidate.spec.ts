import { test, expect } from "@playwright/test";
import CommunFunctions from "../../Commun/CommunFunctions";
import AddNewCandidatePage from "../../pages/AddNewCandidatePage";
const candidatedata = require("../Jdd/CandidatData.json");
const logindata = require("../Jdd/loginData.json");
const dataExpect = require("../ExpectedResult/expectedresult.json");
import fs from "fs";
import path from "path";

const screenshotsDir = path.join(__dirname, "screenshots");

test.describe("Add candidate", () => {
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

    // 1- Je me connecte à mon appli en utilisant la fonction commune Login
    await CommunFunctions.login(
      page,
      logindata[0].username,
      logindata[0].password
    );

    // 2- Je vais sur la page de Gestion de candidats
    await CommunFunctions.goToViewCandidatesPage(page);

    // 3- J'ajoute un nouveau candidat
    await addNewCandidatePage.addNewCandidate(
      candidatedata.first_name,
      candidatedata.last_name,
      candidatedata.email,
      candidatedata.number_phone
    );

    await page.waitForTimeout(5000);
    await expect(addNewCandidatePage.fullNameCheck).toContainText(
      dataExpect.pages.AddNewCandidatePage.CheckCandidateName
    );

    // 4- Déconnexion
    await CommunFunctions.logout(page);
  });
});
