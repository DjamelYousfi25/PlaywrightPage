import { test, expect } from "@playwright/test";
import ConnexionPage from "../pages/ConnexionPage";
import CommunFunctions from "../Commun/communFunctions";
import { describe } from "node:test";
import searchCandidat from "../pages/SeachCandidates";
import searchCandidates from "../pages/SeachCandidates";
const candidatedata = require("../Jdd/CandidatData.json");
const logindata = require("../Jdd/loginData.json");
const dataExpect = require("../expectedResult/expectedresult.json");
const { beforeAll, afterAll, beforeEach, afterEach } = require("../hooks");
let browser;

describe("Search candidate", () => {
  const communfunction = new CommunFunctions();
  test("Search candidate by full name", async ({ page }) => {
    // Créer une instance de ConnexionPage

    const searchCandidat = new searchCandidates(page);

   await CommunFunctions.login( page, logindata[0].username,  logindata[0].password );
    await CommunFunctions.goToViewCandidatesPage(page);
    await searchCandidat.SearchCandidatByFullName(`${candidatedata.last_name}`);
    await communfunction.ElementIsVisible(searchCandidat.FullnameSearch);
    await expect(searchCandidat.ActuelFullNameResult).toContainText(
      `${candidatedata.first_name} ${candidatedata.last_name}`
    );
    await CommunFunctions.logout(page);
  });
});
