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
    await page.click(selectors.loginButton);
  }

  /**
   * Méthode pour se déconnecter de l'application.
   * @param {Page} page - L'instance de la page Playwright.
   */
  static async logout(page: Page) {
    await page.click(selectors.accountName);
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

  /**
   * Vérifie si un élément est visible.
   * @param {Locator} locator - Le locator de l'élément à vérifier.
   * @returns {Promise<boolean>} - True si l'élément est visible, sinon False.
   */
  async elementIsVisible(locator: Locator): Promise<boolean> {
    return await locator.isVisible();
  }

  /**
   * Vérifie si un élément n'est pas visible.
   * @param {Locator} locator - Le locator de l'élément à vérifier.
   * @returns {Promise<boolean>} - True si l'élément n'est pas visible, sinon False.
   */
  async elementIsNotVisible(locator: Locator): Promise<boolean> {
    return !(await locator.isVisible());
  }
}

export default CommunFunctions;;
