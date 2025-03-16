import { test, expect } from "@playwright/test";
import CommunFunctions from "../Commun/communFunctions";
import { describe } from "node:test";
import AddNewCandidatePage from "../pages/AddNewCandidatePage";
const candidatedata = require("../Jdd/CandidatData.json");
const logindata = require("../Jdd/loginData.json");
const dataExpect = require("../expectedResult/expectedresult.json");
const { beforeAll, afterAll, beforeEach, afterEach } = require("../hooks");
let browser;

describe("Vérification de l'envoi du formulaire", () => {
  const communfunction = new CommunFunctions();
  test("Add New candidate with some fields", async ({ page }) => {
    // Créer une instance de ConnexionPage
    const addNewCandidatePage = new AddNewCandidatePage(page);
    await CommunFunctions.login(page,logindata[0].username, logindata[0].password);
    await CommunFunctions.goToViewCandidatesPage(page);
    await addNewCandidatePage.addNewCandidate(
      candidatedata.first_name,
      candidatedata.last_name,
      candidatedata.email,
      candidatedata.number_phone
    );
    await communfunction.ElementIsVisible(addNewCandidatePage.fullNameCheck);
    await expect(addNewCandidatePage.fullNameCheck).toContainText(
      dataExpect.pages.AddNewCandidatePage.CheckCandidateName
    );

    await CommunFunctions.logout(page);
 
  });

  
});
