import { Page, Locator } from "@playwright/test";
import { selectors } from "../Commun/Selectors";

class ViewCandidates {
  page: Page;
  FullnameSearch: Locator;
  SearchButton: Locator;
  ListBoxSelect: Locator;
  ActuelFullNameResult: Locator;

  constructor(page: Page) {
    this.page = page;
    this.FullnameSearch = selectors.FullnameSearch(page);
    this.SearchButton = selectors.SearchButton(page);
    this.ListBoxSelect = selectors.ListBoxSelect(page);
    this.ActuelFullNameResult = selectors.ActuelFullNameResult(page);
  }

  async goToViewCandidatesPage() {
    await this.page.goto("recruitment/viewCandidates");
  }

  async SearchCandidatByFullName(fullname: string) {
    await this.FullnameSearch.fill(fullname);
    await this.ListBoxSelect.getByText("djamel yousfi").first().click();
    await this.SearchButton.click();

   
  }
}


export default ViewCandidates;
