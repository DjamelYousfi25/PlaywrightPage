import { test, expect } from "@playwright/test";
import CommunFunctions from "../Commun/communFunctions";
import SearchCandidates from "../pages/SearchCandidates";
const candidatedata = require("../Jdd/CandidatData.json");
const logindata = require("../Jdd/loginData.json");
const dataExpect = require("../expectedResult/expectedresult.json");
const { beforeAll, afterAll, beforeEach, afterEach } = require("../hooks");
const communfunction = new CommunFunctions();



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
