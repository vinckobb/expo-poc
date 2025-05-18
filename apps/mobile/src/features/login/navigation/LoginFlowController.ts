import * as Flow from "./Flow";

// ViewModel actions
import {
  SMSVerificationViewModelAction,
  LoginViewModelAction,
} from "../screens";

export class LoginFlowControllerImpl implements Flow.Controller {
  static readonly displayName: string = "LoginFlowControllerImpl";

  constructor(private router: Flow.Router) {}

  handleLoginAction(action: LoginViewModelAction) {
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

  handleSMSVerificationAction(action: SMSVerificationViewModelAction): void {
    // GUARD: Unimplemented functionality (navigation) [@dmitry.kovalev]
    this.router.openHome();
  }

  handleSuccessfulLoginFlow(): void {
    this.router.openHome();
  }

  // Lifecycle methods
  dispose() {
    console.log("${displayName} disposed");
  }
}
