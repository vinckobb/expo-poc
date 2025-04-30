import { LoginFlowController } from "./interfaces/LoginFlowController.interface";
import { LoginFlowRouter } from "./interfaces/LoginFlowRouter.interface";

// ViewModel actions
import type { Action as LoginViewModelAction } from "../../screens/Login/LoginViewModel";
import type { Action as SMSVerificationViewModelAction } from "../../screens/SMS Verification/SMSVerificationViewModel";

export class LoginFlowControllerImpl implements LoginFlowController {
  constructor(private router: LoginFlowRouter) {}

  start() {
    console.log("Login flow started");
    this.router.openLogin();
  }

  dispose() {
    console.log("Login flow disposed");
  }

  handleLoginAction(action: LoginViewModelAction) {
    console.log("submitPhone pressed");

    switch (action.type) {
      case "successfulLogin":
        this.router.openSMSVerification();
        break;

      case "passwordRecovery":
        this.router.openPasswordRecovery();
        break;

      case "registration":
        this.router.openRegistration();
        break;
    }
  }

  handleSMSVerificationAction(action: SMSVerificationViewModelAction) {
    switch (action.type) {
      case "successfulSMSConfirmation":
        // this.router.openLoginSuccsess();
        // GUARD: Temp code [@dmitry.kovalev]
        this.router.openHome();
        break;
    }
  }

  handleSuccessfulLoginFlow() {
    this.router.openHome();
  }
}
