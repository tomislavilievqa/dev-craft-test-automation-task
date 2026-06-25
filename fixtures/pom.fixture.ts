import { test as base } from '@playwright/test';
import { LoginPage } from '@pages/login.page';
import { RegistrationPage } from '@pages/registration.page';
import { RegistrationValidator } from '@pages/validators/registration.validator';
import { ActivationPopupValidator } from '@pages/validators/activation-popup.validator';

type PomFixtures = {
  loginPage: LoginPage;
  registrationPage: RegistrationPage;
  registrationValidator: RegistrationValidator;
  activationPopupValidator: ActivationPopupValidator;
};

export const test = base.extend<PomFixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  registrationPage: async ({ page }, use) => {
    await use(new RegistrationPage(page));
  },

  registrationValidator: async ({ page, registrationPage }, use) => {
    await use(new RegistrationValidator(page, registrationPage));
  },

  activationPopupValidator: async ({ page, registrationPage }, use) => {
    await use(new ActivationPopupValidator(page, registrationPage.activationPopup));
  },
});

export { expect } from '@playwright/test';
