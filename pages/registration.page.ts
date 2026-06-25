import type { Page, Locator } from '@playwright/test';
import { ActivationPopupComponent } from './components/activation-popup.component';
import { Routes } from '@constants/routes.enum';

export class RegistrationPage {
  // Form locators — inlined here since the registration form is unique to this page
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly termsCheckbox: Locator;
  readonly termsCheckboxIcon: Locator;
  readonly registerButton: Locator;
  readonly emailHint: Locator;
  readonly pageHeading: Locator;

  // Reusable component — the activation popup can appear in other contexts (e.g. login 2FA)
  readonly activationPopup: ActivationPopupComponent;

  constructor(private readonly page: Page) {
    this.emailInput = page.getByLabel(/e-mail address/i);
    this.passwordInput = page.getByLabel(/password/i);
    this.termsCheckbox = page.getByRole('checkbox');
    // Click the inner icon to avoid accidentally navigating to the terms link text
    this.termsCheckboxIcon = page.locator('.q-checkbox__inner').first();
    this.registerButton = page.getByRole('button', { name: /register/i });
    this.emailHint = page.getByText(/we will send you a code to verify your email/i);
    this.pageHeading = page.getByRole('heading', { name: /join/i });

    this.activationPopup = new ActivationPopupComponent(page);
  }

  async navigate(): Promise<void> {
    await this.page.goto(Routes.REGISTER);
  }

  async enterEmail(email: string): Promise<void> {
    await this.emailInput.fill(email);
  }

  async enterPassword(password: string): Promise<void> {
    await this.passwordInput.fill(password);
  }

  async acceptTermsAndConditions(): Promise<void> {
    const isChecked = await this.termsCheckbox.getAttribute('aria-checked');
    if (isChecked !== 'true') {
      await this.termsCheckboxIcon.click();
    }
  }

  async clickRegister(): Promise<void> {
    await this.registerButton.click();
  }

  async registerUser(email: string, password: string): Promise<void> {
    await this.enterEmail(email);
    await this.enterPassword(password);
    await this.acceptTermsAndConditions();
    await this.clickRegister();
  }
}
