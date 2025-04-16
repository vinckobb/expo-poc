export interface LoginFlowRouter {
  openLogin(): void;
  openSMSVerification(): void;
  openPasswordRecovery(): void;
  openRegistration(): void;
  openLoginSuccsess(): void;
  openHome(): void;
}
