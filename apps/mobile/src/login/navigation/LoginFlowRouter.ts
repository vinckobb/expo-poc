import type { LoginParamList } from "./paramList";
import { LoginFlowRouter } from "./interfaces/LoginFlowRouter.interface";
import { LoginFlowRouterDelegate } from "./interfaces/LoginFlowRouterDelegate.interface";
import { NavigationProp } from "@react-navigation/native";

export class LoginFlowRouterImpl<T extends LoginParamList> implements LoginFlowRouter {
  constructor(
    private nav: NavigationProp<T>,
    private delegate?: LoginFlowRouterDelegate
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
