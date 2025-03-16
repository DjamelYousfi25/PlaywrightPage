import { Page, Locator } from "@playwright/test";
import { selectors } from "../Commun/Selectors";

class searchCandidates {
  page: Page;
  FullnameSearch: Locator;
  SearchButton: Locator;
  ListBoxSelect: Locator;
  ActuelFullNameResult: Locator;

  constructor(page: Page) {
    this.page = page;

    // Définir les locators en utilisant les sélecteurs
    this.FullnameSearch = page.locator(selectors.FullnameSearch);
    this.SearchButton = page.locator(selectors.SearchButton);
    //this.ListBoxSelect = page.locator(selectors.ListBoxSelect);
     this.ListBoxSelect = selectors.ListBoxSelect(page);
    this.ActuelFullNameResult = page.locator(selectors.ActuelFullNameResult);
  }



  /**
   * Recherche un candidat par son nom complet.
   * @param {string} fullname - Le nom complet du candidat.
   */
  async SearchCandidatByFullName(fullname: string) {
    await this.FullnameSearch.fill(fullname);
     await this.page.waitForTimeout(3000);
    
    await this.ListBoxSelect.getByText("djamel yousfi").first().click();
    await this.SearchButton.click();
  }
}

export default searchCandidates;
