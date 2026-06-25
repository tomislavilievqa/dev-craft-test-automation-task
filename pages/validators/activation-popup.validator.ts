import { expect, type Page } from '@playwright/test';
import type { ActivationPopupComponent } from '../components/activation-popup.component';

export class ActivationPopupValidator {
  constructor(
    private readonly page: Page,
    private readonly activationPopup: ActivationPopupComponent
  ) {}

  async assertPopupVisible(): Promise<void> {
    await expect(this.activationPopup.container).toBeVisible();
  }

  async assertVerificationTextVisible(): Promise<void> {
    await expect(this.activationPopup.verificationText).toBeVisible();
  }

  async assertCodeInputsPresent(): Promise<void> {
    // The popup contains 5 individual digit inputs for the activation code
    await expect(this.activationPopup.codeInputs).toHaveCount(5);
  }
}
