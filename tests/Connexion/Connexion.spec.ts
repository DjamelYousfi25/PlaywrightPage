import { test, expect } from "@playwright/test";
import { describe } from "node:test";
import ConnexionPage from "../../pages/ConnexionPage";
import CommunFunctions from "../../Commun/CommunFunctions";
const logindata = require("../Jdd/loginData.json");
const dataExpect = require("../ExpectedResult/expectedresult.json");
const { beforeAll, afterAll, beforeEach, afterEach } = require("../hooks");

describe("Vérification de la connexion", () => {
  const communfunction = new CommunFunctions();

  test("Test de connexion réussie", async ({ page }) => {
    const connexionPage = new ConnexionPage(page);
    await connexionPage.login(logindata[0].username, logindata[0].password);
    await expect(connexionPage.Time_at_Work_label).toContainText(
      dataExpect.pages.connexion_page.Time_at_Work_label
    );
  });

  test("Test de connexion échouée", async ({ page }) => {
    const connexionPage = new ConnexionPage(page);
    await connexionPage.login(logindata[1].username, logindata[1].password);
    await communfunction.elementIsNotVisible(connexionPage.Time_at_Work_label);
    await expect(connexionPage.errorLogin).toContainText(
      dataExpect.pages.connexion_page.Connexion_error
    );
  });
});
