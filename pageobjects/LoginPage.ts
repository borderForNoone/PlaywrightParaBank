import { Locator, Page } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly signInButton: Locator;
  readonly myAccountHeader: Locator

  constructor(page: Page) {
    this.page = page;
    this.emailInput = this.page.locator('#email');
    this.passwordInput = this.page.getByTitle('Password');
    this.signInButton = this.page.locator('div[class="primary"] .login');
    this.myAccountHeader = this.page.locator('span[data-ui-id="page-title-wrapper"]');
  }

  async open() {
    await this.page.goto('https://magento.softwaretestingboard.com/customer/account/login/');
  }

  async login(username: string, password: string) {
    await this.emailInput.fill(username);
    await this.passwordInput.fill(password);
    await this.signInButton.click();
  }
}