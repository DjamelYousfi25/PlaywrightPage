import { test, expect } from "@playwright/test";
import ConnexionPage from "../pages/ConnexionPage";
import CommunFunctions from "../Commun/communFunctions";
import { describe } from "node:test";
import ViewCandidates from "../pages/viewCandidates";
const candidatedata = require("../Jdd/CandidatData.json");
const logindata = require("../Jdd/loginData.json");
const dataExpect = require("../expectedResult/expectedresult.json");
const { beforeAll, afterAll, beforeEach, afterEach } = require("../hooks");
let browser;

describe("Search candidate", () => {
  const communfunction = new CommunFunctions();
  test("Search candidate by full name", async ({ page }) => {
    // Créer une instance de ConnexionPage
    const connexion = new ConnexionPage(page);
    const viewCandidates = new ViewCandidates(page);
    const communfunctions = new CommunFunctions();
    connexion.Connexion(logindata[0].username, logindata[0].password);
    await viewCandidates.goToViewCandidatesPage();
    await viewCandidates.SearchCandidatByFullName(
        `${candidatedata.last_name}`
   
    );
    await communfunction.ElementIsVisible(viewCandidates.FullnameSearch);
    await expect(viewCandidates.ActuelFullNameResult).toContainText(
      `${candidatedata.first_name} ${candidatedata.last_name}`
    );
  });
});
