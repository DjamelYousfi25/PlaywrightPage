import { Page, Locator } from "@playwright/test";
import CommunFunctions from "../Commun/CommunFunctions";
import { selectors } from "../Commun/Selectors";

/**
 * Classe représentant la page de connexion.
 */
class ConnexionPage {
  page: Page;

  Time_at_Work_label: Locator;
  Self_Review_label: Locator;
  errorLogin: Locator;

  //connexion xredientiels

  username: Locator;
  password: Locator;
  //check_connect_ok:Locator;

  constructor(page: Page) {
    this.page = page;

     this.username = page.locator(selectors.username);
    this.password = page.locator(selectors.password);
    this.errorLogin = selectors.errorLogin(page);
    this.Time_at_Work_label = page.locator(selectors.Time_at_Work_label);

  }

  /**
   * Méthode pour se connecter à l'application.
   * @param {string} username - Le nom d'utilisateur.
   * @param {string} password - Le mot de passe.
   */
  async login(username: string, password: string) {
    await CommunFunctions.login(this.page, username, password);
  }
}

export default ConnexionPage;


