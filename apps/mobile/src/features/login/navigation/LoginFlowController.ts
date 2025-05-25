import * as FlowType from "./types/flowTypes";

export class LoginFlowControllerImpl implements FlowType.Controller {
  static readonly displayName: string = "LoginFlowControllerImpl";

  constructor(private router: FlowType.Router) {}

  handleLoginAction(action: FlowType.Actions.LoginAction) {
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

  handleSMSVerificationAction(
    action: FlowType.Actions.SMSVerificationAction
  ): void {
    // GUARD: Unimplemented functionality (navigation) [@dmitry.kovalev]
    this.router.openHome();
  }

  handleSuccessfulLoginFlow(): void {
    this.router.openHome();
  }

  // Lifecycle methods
  dispose() {
    console.log(`❌ ${LoginFlowControllerImpl.displayName} disposed`);
  }
}
