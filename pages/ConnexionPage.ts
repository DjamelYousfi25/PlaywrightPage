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
  //check_connect_ok:Locator;

  constructor(page: Page) {
    this.page = page;

//    this.errorLogin = page.locator(selectors.errorLogin(page));

      this.errorLogin = selectors.errorLogin(page);
    this.Time_at_Work_label = page.locator(selectors.Time_at_Work_label);
    //this.check_connect_ok = page.locator( '//*[@id="app"]/div[1]/div[2]/div[2]/div/div[2]/div/div[1]/div/p' );

  }

  /**
   * Méthode pour se connecter à l'application.
   * @param {string} username1 - Le nom d'utilisateur.
   * @param {string} password1 - Le mot de passe.
   */
  async login(username1: string, password1: string) {
    await CommunFunctions.login(this.page, username1, password1);

  /*    await this.page.goto(
        "https://opensource-demo.orangehrmlive.com/web/index.php"
      );
      await this.page
        .getByRole("textbox", { name: "Username" })
        .fill(username1);
      await this.page
        .getByRole("textbox", { name: "Password" })
        .fill(username1);
      await this.page.getByRole("button", { name: "Login" }).click();*/

  }
}

export default ConnexionPage;


