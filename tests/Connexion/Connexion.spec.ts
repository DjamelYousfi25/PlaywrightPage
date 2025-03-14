import { test, expect } from "@playwright/test";
import ConnexionPage from "../pages/ConnexionPage";
import CommunFunctions from "../CommunFunctions/communFunctions";
import { describe } from "node:test";
const logindata = require("../Jdd/loginData.json");
const dataExpect = require("../expectedResult/expectedresult.json");
const {
  beforeAll,
  afterAll,
  beforeEach,
  afterEach,
} = require("../hooks");
let browser;

describe("Vérification de la connexion",()=>{
    

const communfunction=new CommunFunctions();
test("Test de connexion Ok", async ({ page }) => {

 // Créer une instance de ConnexionPage
 const connexionPage = new ConnexionPage(page);
  const communfunctions=new  CommunFunctions(); 

  await connexionPage.Connexion(logindata[0].username, logindata[0].password);
  await expect(connexionPage.Time_at_Work_label).toContainText(dataExpect.pages.connexion_page.Time_at_Work_label );

});

test("Test de connexion Echec", async ({ page }) => {

     const connexionPage = new ConnexionPage(page);

  await connexionPage.Connexion(logindata[1].username, logindata[1].password);
  await communfunction.ElementIsNotNotVisible(connexionPage.Time_at_Work_label);
  await expect(connexionPage.Connexion_error).toContainText(dataExpect.pages.connexion_page.Connexion_error);

});






})

