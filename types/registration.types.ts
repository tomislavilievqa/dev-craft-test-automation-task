export interface RegistrationData {
  validUser: {
    email: string;
    password: string;
  };
  invalidUser: {
    email: string;
    password: string;
  };
  boundaryData: {
    emailLocalPart63: string;
    emailLocalPart64: string;
    emailLocalPart65: string;
    emailDomain: string;
    passwordLength71: string;
    passwordLength72: string;
    passwordLength73: string;
  };
}
