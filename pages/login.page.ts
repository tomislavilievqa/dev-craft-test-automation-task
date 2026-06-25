import type { Page, Locator } from '@playwright/test';
import { Routes } from '@constants/routes.enum';

export class LoginPage {
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly joinHereLink: Locator;
  readonly forgotPasswordLink: Locator;

  constructor(private readonly page: Page) {
    this.emailInput = page.getByLabel(/e-mail address/i);
    this.passwordInput = page.getByLabel(/password/i);
    this.loginButton = page.getByRole('button', { name: /login/i });
    this.joinHereLink = page.getByRole('link', { name: /join here/i });
    this.forgotPasswordLink = page.getByRole('link', { name: /forgot password/i });
  }

  async navigate(): Promise<void> {
    await this.page.goto(Routes.LOGIN);
  }

  async enterEmail(email: string): Promise<void> {
    await this.emailInput.fill(email);
  }

  async enterPassword(password: string): Promise<void> {
    await this.passwordInput.fill(password);
  }

  async clickLogin(): Promise<void> {
    await this.loginButton.click();
  }

  async goToRegistration(): Promise<void> {
    await this.joinHereLink.click();
    // The app redirects to /signup/1 for step 1 of registration
    await this.page.waitForURL(`**${Routes.REGISTER}**`);
  }
}
