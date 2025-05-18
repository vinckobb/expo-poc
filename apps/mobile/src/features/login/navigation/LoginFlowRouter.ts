import { NavigationProp } from "@react-navigation/native";

import * as Flow from "./Flow";

export class LoginFlowRouterImpl<T extends Flow.ParamList> implements Flow.Router {
  static readonly displayName: string = "WelcomeFlowRouterImpl";

  constructor(
    private nav: NavigationProp<T>,
    private delegate?: Flow.Delegate
  ) {}

  openLogin() {
    this.nav.navigate("Login", undefined);
    console.log("Navigating to login");
  }

  openSMSVerification() {
    this.nav.navigate("SMSVerification", undefined);
  }

  openPasswordRecovery() {
    console.log("Navigating to password recovery via delegate");
    this.delegate?.openPasswordRecovery();
  }

  openRegistration() {
    console.log("Navigating to registration via delegate");
    this.delegate?.openRegistration();
  }

  openLoginSuccsess() {
    console.log("Navigating to login success");
  }

  openHome() {
    console.log("Navigating to home via delegate");
    this.delegate?.openHome();
  }
}
