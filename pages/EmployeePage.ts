import { Page, Locator, expect } from "@playwright/test";
import { selectors } from "../Commun/Selectors";
const path = require("path");
const fs = require("fs");

const filePath = path.join(__dirname, "../document/attentesApprenant.pdf");

/**
 * Classe représentant la page d'ajout d'un nouveau candidat.
 */
class EmployeePage {
  page: Page;
  PimLink: Locator;
  AddButtonPim: Locator;
  First_name: Locator;
  Middle_name: Locator;
  Last_name: Locator;
  Employee_Id: Locator;
  Save_button: Locator;
  FullEmployeenamecheck:Locator

  constructor(page: Page) {
    this.page = page;

    // Définir les locators en utilisant les sélecteurs

    this.PimLink =page.locator(selectors.PimLink);
    this.AddButtonPim = selectors.AddButtonPim(page);
    this.First_name = selectors.First_name(page);
    this.Middle_name = selectors.Middle_name(page);
    this.Last_name = selectors.Last_name(page);
    this.Employee_Id = selectors.Employee_Id(page);
    this.Save_button = selectors.Save_button(page);
    this.FullEmployeenamecheck=selectors.fullNameCheck(page);
  }

  /**
   * Ajoute un nouveau candidat avec les détails fournis.
   * @param {string} firstname - Le prénom du candidat.
   * @param {string} middlename - Le nom de famille du candidat.
   * @param {string} lastname - L'email du candidat.
   * @param {string} employeeId - Le numéro de téléphone du candidat.
   */
  async addNewEmployee(
    firstname: string,
    middlename: string,
    lastname: string,
    employeeId: string
  ) {

    await this.PimLink.waitFor({ state: "visible" });
    await this.PimLink.click();
    await this.AddButtonPim.click();
    await this.First_name.fill(firstname);
    await this.Middle_name.fill(middlename);
    await this.Last_name.fill(lastname);
    await this.Employee_Id.nth(4).fill(employeeId);
    await this.Save_button.click();

  
  }
}

export default EmployeePage;
