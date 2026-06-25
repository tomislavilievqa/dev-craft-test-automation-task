import type { Page, Locator } from '@playwright/test';

export class ActivationPopupComponent {
  readonly container: Locator;
  readonly verificationText: Locator;
  readonly codeInputs: Locator;

  constructor(private readonly page: Page) {
    this.container = page.getByRole('dialog');
    // Actual text shown on the popup
    this.verificationText = page.getByText(/verification code sent/i);
    // The popup contains 5 single-digit textboxes for the activation code
    this.codeInputs = page.getByRole('dialog').getByRole('textbox');
  }

  async isVisible(): Promise<boolean> {
    return this.container.isVisible().catch(() => false);
  }
}
