import { Page, Locator, expect } from "@playwright/test";
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
    this.recruitmentLink = page.locator(
      '//*[@id="app"]/div[1]/div[1]/aside/nav/div[2]/ul/li[5]/a/span'
    );
    this.addButton = page.locator('button:text("Add")');
    this.firstName = page.locator('input[name="firstName"]');
    this.lastName = page.locator('input[name="lastName"]');
    this.vacancyDropdownIcon = page.locator("form i").first();
    this.vacancyOption = page.locator(
      'div[role="option"]:has-text("Senior QA Lead")'
    );
    this.email = page.locator(
      '//*[@id="app"]/div[1]/div[2]/div[2]/div/div/form/div[3]/div/div[1]/div/div[2]/input'
    );
    this.phoneNumber = page.locator(
      '//*[@id="app"]/div[1]/div[2]/div[2]/div/div/form/div[3]/div/div[2]/div/div[2]/input'
    );
    this.browseButton = page.locator('input[type="file"]');
    this.saveButton = page.locator('button:text("Save")');
    this.fullNameCheck = page.locator("#app");
  }

  async goToViewCandidatesPage() {
    await this.recruitmentLink.click();
  }

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
    await this.email.fill(email);
    await this.phoneNumber.fill(phoneNumber);
    await this.browseButton.setInputFiles(filePath);
    await this.saveButton.click();
  }
}

export default AddNewCandidatePage;
