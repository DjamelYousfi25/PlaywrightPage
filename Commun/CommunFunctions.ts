import { Page, Locator } from "@playwright/test";
import { selectors } from "./Selectors";

/**
 * Classe contenant des fonctions communes utilisées dans les tests.
 */
class CommunFunctions {
  /**
   * Méthode pour se connecter à l'application.
   * @param {Page} page - L'instance de la page Playwright.
   * @param {string} username - Le nom d'utilisateur.
   * @param {string} password - Le mot de passe.
   */
  static async login(page: Page, username: string, password: string) {
    await page.waitForSelector(selectors.username);
    await page.waitForSelector(selectors.password);
     await page.fill(selectors.username, username);
    await page.fill(selectors.password, password);

 /* await selectors.username(page).waitFor();
  await selectors.password(page).waitFor();
  selectors.username(page).fill(username);
  selectors.password(page).fill(password);*/
  //  await page.fill(selectors.password(page), password);
    await page.click(selectors.loginButton);
  }

  /**
   * Méthode pour se déconnecter de l'application.
   * @param {Page} page - L'instance de la page Playwright.
   */
  static async logout(page: Page) {
    await selectors.accountNameImg(page).click();
    //await page.click(selectors.accountName);
    await page.waitForSelector(selectors.Logout);
    await page.click(selectors.Logout);
  }

  /**
   * Navigue vers la page de visualisation des candidats.
   * @param {Page} page - L'instance de la page Playwright.
   */
  static async goToViewCandidatesPage(page: Page) {
    await page.click(selectors.recrutementLink);
  }

  static async goToViewEmployeePage(page: Page) {
    await page.click(selectors.PimLink);
  }

}

export default CommunFunctions;;
