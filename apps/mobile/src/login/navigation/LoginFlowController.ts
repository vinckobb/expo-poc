import type { Action as LoginViewModelAction } from "../../screens/Login/LoginViewModel";
import type { Action as SMSVerificationViewModelAction } from "../../screens/SMSVerification/SMSVerificationViewModel";
import type { LoginRouter } from "./LoginRouter";

export class LoginFlowController {
  constructor(private router: LoginRouter) {}

  start() {
    console.log("Login flow started");
  }

  dispose() {
    console.log("Login flow disposed");
  }

  handleLoginAction(action: LoginViewModelAction) {
    switch (action.type) {
      case "submitPhone":
        // this.router.navigateToSmsVerification(action.phone);
        break;
    }
  }

  handleSMSVerificationAction(action: SMSVerificationViewModelAction) {
    switch (action.type) {
      case "submitCode":
        // this.router.navigateToSmsVerification(action.phone);
        break;
    }
  }
}
