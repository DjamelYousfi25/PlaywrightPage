import { Page, Locator } from "@playwright/test";
import { selectors } from "../Commun/Selectors";
import CommunFunctions from "../Commun/communFunctions";

class ConnexionPage {
  page: Page; // Déclarer la propriété 'page' avec son type
  username: Locator;
  passwordField: Locator;
  loginButton: Locator;
  Time_at_Work_label: Locator;
  Self_Review_label: Locator;
  Connexion_error: Locator;

  constructor(page) {
    this.page = page;
     this.username = page.locator(
       '//*[@id="app"]/div[1]/div/div[1]/div/div[2]/div[2]/form/div[1]/div/div[2]/input'
     );
     this.passwordField = page.locator('input[name="password"]');
     this.loginButton = page.locator("//*/button");
     this.Connexion_error = page.locator(
       '//*[@id="app"]/div[1]/div/div[1]/div/div[2]/div[2]/div/div[1]/div[1]/p'
     );
     this.Time_at_Work_label = page.locator("#app");
     this.Self_Review_label = page.locator("#app");
  }

  async login(username1: string, password1: string) {
    // Appeler la méthode statique `login` de CommunFunctions
    await CommunFunctions.login(this.page, username1, password1);
  }
}
export default ConnexionPage;
