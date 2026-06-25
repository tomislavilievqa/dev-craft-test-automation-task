import { test } from '../../fixtures/pom.fixture';

test.describe('Navigation', () => {
  test('NAV-001 - Navigate to registration page via "Join here" link on login page', async ({
    loginPage,
    registrationValidator,
  }) => {
    await loginPage.navigate();
    await loginPage.goToRegistration();
    await registrationValidator.assertOnRegistrationPage();
  });
});
