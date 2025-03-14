import { Page, Locator } from "@playwright/test";
class CommunFunctions {

  async ElementIsVisible(locator: Locator): Promise<boolean> {
    return (await locator.isVisible());
  }

  async ElementIsNotNotVisible(locator: Locator): Promise<boolean> {
    return !(await locator.isVisible());
  }
}
export default CommunFunctions;