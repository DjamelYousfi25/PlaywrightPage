import { test, expect } from "@playwright/test";
import CommunFunctions from "../Commun/communFunctions";
import AddNewCandidatePage from "../pages/AddNewCandidatePage";
const candidatedata = require("../Jdd/CandidatData.json");
const logindata = require("../Jdd/loginData.json");
const dataExpect = require("../expectedResult/expectedresult.json");
const { beforeAll, afterAll, beforeEach, afterEach } = require("../hooks");


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
    await page.waitForTimeout(3000);
    await expect(addNewCandidatePage.fullNameCheck).toContainText(dataExpect.pages.AddNewCandidatePage.CheckCandidateName);
    await CommunFunctions.logout(page);
  });

