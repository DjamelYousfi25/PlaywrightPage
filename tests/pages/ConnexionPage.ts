import { Page, Locator } from "@playwright/test";

class ConnexionPage {
  page: Page; // Déclarer la propriété 'page' avec son type

  username: Locator;
  pawwwordField: Locator;
  loginButton: Locator;
  Time_at_Work_label: Locator;
  Self_Review_label: Locator;
  Connexion_error: Locator;

  constructor(page) {
    this.page = page;

    //*[@id="app"]/div[1]/div/div[1]/div/div[2]/div[2]/form/div[1]/div/div[2]/input
    this.username = page.locator('input[name="username"]');
    this.pawwwordField = page.locator('input[name="password"]');
    this.loginButton = page.locator("//*/button");
    this.Connexion_error = page.locator(
      '//*[@id="app"]/div[1]/div/div[1]/div/div[2]/div[2]/div/div[1]/div[1]/p'
    );
    this.Time_at_Work_label = page.locator("#app");
    this.Self_Review_label = page.locator("#app");
  }

  async Connexion(username, passwordField) {
    await this.username.fill(username);  
    await this.pawwwordField.fill(passwordField);
    console.log(`username est ${username} et password ets ${passwordField}`);
    await this.loginButton.click();
  }
}
export default ConnexionPage;
