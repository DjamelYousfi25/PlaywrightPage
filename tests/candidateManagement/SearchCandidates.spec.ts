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

  test("Rechercher un candidat par nom complet", async ({ page }) => {
    const searchCandidates = new SearchCandidates(page);
    await CommunFunctions.login(
      page,
      logindata[0].username,
      logindata[0].password
    );
    await CommunFunctions.goToViewCandidatesPage(page);
    await searchCandidates.searchCandidatByFullName(
      `${candidatedata.last_name}`
    );
    await communfunction.elementIsVisible(searchCandidates.FullnameSearch);
    await expect(searchCandidates.ActuelFullNameResult).toContainText(
      `${candidatedata.first_name} ${candidatedata.last_name}`
    );
    await CommunFunctions.logout(page);
});
});
