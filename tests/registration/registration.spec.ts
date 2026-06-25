import { test } from '../../fixtures/pom.fixture';
import { generateRandomEmail } from '@utils/random-email.util';
import { readJsonFile } from '@utils/json-reader.util';
import type { RegistrationData } from '@app-types/registration.types';

const testData = readJsonFile<RegistrationData>('test-data/registration.json');

test.describe('Registration Flow', () => {
  let email: string;
  const validUser = testData.validUser;
  const invalidUser = testData.invalidUser;
  const boundaryData = testData.boundaryData;

  test.beforeEach(async ({ registrationPage, registrationValidator }) => {
    email = generateRandomEmail();
    await registrationPage.navigate();
    await registrationValidator.assertOnRegistrationPage();
  });

  test('TC-001 - Register with valid email and valid password', async ({
    registrationPage,
    activationPopupValidator,
  }) => {
    await registrationPage.enterEmail(email);
    await registrationPage.enterPassword(validUser.password);
    await registrationPage.acceptTermsAndConditions();
    await registrationPage.clickRegister();

    await activationPopupValidator.assertPopupVisible();
    await activationPopupValidator.assertVerificationTextVisible();
    await activationPopupValidator.assertCodeInputsPresent();
  });

  test.skip('TC-002 - Register with empty email', async ({ registrationPage }) => {
    // Expected: email field red border (rgb(193, 0, 21)), inline message "Required field", URL stays on /signup/1 // TODO: implement assertions
    await registrationPage.enterPassword(validUser.password);
    await registrationPage.acceptTermsAndConditions();
    await registrationPage.clickRegister();
  });

  test.skip('TC-003 - Register with invalid email format', async ({ registrationPage }) => {
    // Expected: email field red border (rgb(193, 0, 21)), inline message "Invalid e-mail", URL stays on /signup/1 // TODO: implement assertions
    await registrationPage.enterEmail(invalidUser.email);
    await registrationPage.enterPassword(validUser.password);
    await registrationPage.acceptTermsAndConditions();
    await registrationPage.clickRegister();
  });

  test.skip('TC-004 - Register with empty password', async ({ registrationPage }) => {
    // Expected: password field red border (rgb(193, 0, 21)), inline message "Required field", URL stays on /signup/1 // TODO: implement assertions
    await registrationPage.enterEmail(email);
    await registrationPage.acceptTermsAndConditions();
    await registrationPage.clickRegister();
  });

  test.skip('TC-005 - Register with weak password', async ({ registrationPage }) => {
    // NOTE : BUG001 // Expected: form does does proceed; // TODO: implement assertions
    await registrationPage.enterEmail(email);
    await registrationPage.enterPassword(invalidUser.password);
    await registrationPage.acceptTermsAndConditions();
    await registrationPage.clickRegister();
  });

  test.skip('TC-006 - Register without accepting Terms & Conditions', async ({
    // Expected: T&C checkbox red border (rgb(193, 0, 21)), inline + alert message "Required field", URL stays on /signup/1 // TODO: implement assertions
    registrationPage,
  }) => {
    await registrationPage.enterEmail(email);
    await registrationPage.enterPassword(validUser.password);
    // intentionally skip acceptTermsAndConditions()
    await registrationPage.clickRegister();
  });

  test.skip('TC-007 - Verify password visibility toggle', async ({ registrationPage }) => {
    // Expected: input type toggles "password" → "text" on eye click, toggles back on second click // TODO: implement assertions
    await registrationPage.enterPassword(validUser.password);
    // click eye icon and assert input type changes
  });

  test.skip('TC-008 - Verify email field length boundary', async ({ registrationPage }) => {
    //   65×"a" + "@mailinator.com" → rejected: "must be a well-formed email address" //   64×"a" + "@mailinator.com" → accepted (RFC 5321 max local part) //   63×"a" + "@mailinator.com" → accepted // Boundary data: // No client-side maxlength enforced (BUG-002) // Expected: local part ≤64 chars accepted; local part ≥65 chars rejected with "must be a well-formed email address" // TODO: implement assertions
    await registrationPage.enterEmail(
      `${boundaryData.emailLocalPart65}${boundaryData.emailDomain}`
    );
    await registrationPage.enterPassword(validUser.password);
    await registrationPage.acceptTermsAndConditions();
    await registrationPage.clickRegister();
  });

  test.skip('TC-009 - Verify password field length boundary', async ({ registrationPage }) => {
    //   73 chars → rejected: "GENERAL_EXCEPTION" (BUG-002) //   72 chars → accepted (server max) //   71 chars → accepted // Boundary data: // No client-side maxlength enforced (BUG-003) // Observed boundary: max accepted = 72 chars; 73+ chars → server returns "GENERAL_EXCEPTION" // TODO: implement assertions
    await registrationPage.enterEmail(email);
    await registrationPage.enterPassword(boundaryData.passwordLength73);
    await registrationPage.acceptTermsAndConditions();
    await registrationPage.clickRegister();
  });

  test.skip('TC-010 - Register with an already-registered email', async ({ registrationPage }) => {
    // NOTE: no rate limiting observed (BUG-003) // Expected: server returns "User with this email already exist", URL stays on /signup/1 // TODO: implement assertions
    // Step 1: register with a fresh email (beforeEach already navigated to /signup/1)
    await registrationPage.registerUser(email, validUser.password);
    // Step 2: navigate back and attempt duplicate registration with the same email
    await registrationPage.navigate();
    await registrationPage.registerUser(email, validUser.password);
  });

  test.skip('TC-011 - Verify Activation Code popup content after successful registration', async ({
    //   • "Click here" update email link present //   • "click here" resend link present //   • 5 individual digit input boxes visible //   • Registered email shown in popup text //   • Dialog with text "Verification code sent" // Expected: // TODO: implement assertions
    registrationPage,
    activationPopupValidator,
  }) => {
    await registrationPage.registerUser(email, validUser.password);
    await activationPopupValidator.assertPopupVisible();
  });
});
