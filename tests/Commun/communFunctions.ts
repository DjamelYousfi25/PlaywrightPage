import { Page, Locator } from "@playwright/test";
import{selectors} from "./Selectors";
class communFunctions {
  //Methode commiune de connexion
  static async login(page: Page, username: string, password: string) {
      await page.waitForSelector(selectors.username);
      await page.waitForSelector(selectors.password);

    await page.fill(selectors.username, username);
    await page.fill(selectors.password, password);
    await page.click(selectors.loginButton);
  }

  //Méthode commune de deco
  static async logout(page: Page) {
    await page.click(selectors.accountName);
    await page.waitForSelector(selectors.Logout);
    await page.click(selectors.Logout);
  }

  /**
   * Navigue vers la page de visualisation des candidats.
   */
  static async goToViewCandidatesPage(page:Page) {
   await page.click(selectors.recrutementLink);
  }

  async ElementIsVisible(locator: Locator): Promise<boolean> {
    return await locator.isVisible();
  }

  async ElementIsNotNotVisible(locator: Locator): Promise<boolean> {
    return !(await locator.isVisible());
  }
}
export default communFunctions;

/*
netstat -ano | findstr :9323
taskkill /PID <PID> /F
*/