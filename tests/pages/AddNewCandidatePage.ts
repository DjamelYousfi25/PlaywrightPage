import { Page, Locator, expect } from "@playwright/test";
import { selectors } from "../Commun/Selectors";
const path = require("path");
const fs = require("fs");

const filePath = path.join(__dirname, "../document/attentesApprenant.pdf");

class AddNewCandidatePage {
  page: Page;
  recruitmentLink: Locator;
  addButton: Locator;
  firstName: Locator;
  lastName: Locator;
  vacancyDropdownIcon: Locator;
  vacancyOption: Locator;
  email: Locator;
  phoneNumber: Locator;
  browseButton: Locator;
  saveButton: Locator;
  fullNameCheck: Locator;

  constructor(page: Page) {
    this.page = page;

    // Définir les locators en utilisant les sélecteurs
    this.recruitmentLink = page.locator(selectors.recrutementLink);
    this.addButton = page.locator(selectors.addButton);
    this.firstName = page.locator(selectors.firstName);
    this.lastName = page.locator(selectors.lastName);
    this.vacancyDropdownIcon = page
      .locator(selectors.vacancyDropdownIcon)
      .first();
    this.vacancyOption = page.locator(selectors.vacancyOption);
    this.email = page.locator(selectors.email);
    this.phoneNumber = page.locator(selectors.phoneNumber);
    this.browseButton = page.locator(selectors.browseButton);
    this.saveButton = page.locator(selectors.saveButton);
    this.fullNameCheck = page.locator(selectors.fullNameCheck);
  }


  /**
   * Ajoute un nouveau candidat avec les détails fournis.
   * @param {string} firstname - Le prénom du candidat.
   * @param {string} lastname - Le nom de famille du candidat.
   * @param {string} email - L'email du candidat.
   * @param {string} phoneNumber - Le numéro de téléphone du candidat.
   */
  async addNewCandidate(
    firstname: string,
    lastname: string,
    email: string,
    phoneNumber: string
  ) {
    // Vérifier que le fichier existe
    if (!fs.existsSync(filePath)) {
      throw new Error(`File not found: ${filePath}`);
    }

    await this.addButton.click();
    await expect(this.firstName).toBeVisible();
    await this.firstName.fill(firstname);
    await this.lastName.fill(lastname);
    await this.vacancyDropdownIcon.click();
    await this.vacancyOption.click();
    await this.email.first().fill(email);
    await this.phoneNumber.nth(1).fill(phoneNumber);
    await this.browseButton.setInputFiles(filePath);
    await this.saveButton.click();
  }
}

export default AddNewCandidatePage;
