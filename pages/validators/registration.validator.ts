import { expect, type Page } from '@playwright/test';
import type { RegistrationPage } from '../registration.page';
import { Routes } from '@constants/routes.enum';

export class RegistrationValidator {
  constructor(
    private readonly page: Page,
    private readonly registrationPage: RegistrationPage
  ) {}

  async assertOnRegistrationPage(): Promise<void> {
    await expect(this.page).toHaveURL(new RegExp(`${Routes.REGISTER}`));
    await expect(this.registrationPage.registerButton).toBeVisible();
  }

  async assertEmailFieldVisible(): Promise<void> {
    await expect(this.registrationPage.emailInput).toBeVisible();
  }

  async assertPasswordFieldVisible(): Promise<void> {
    await expect(this.registrationPage.passwordInput).toBeVisible();
  }

  async assertRegisterButtonEnabled(): Promise<void> {
    await expect(this.registrationPage.registerButton).toBeEnabled();
  }
}
