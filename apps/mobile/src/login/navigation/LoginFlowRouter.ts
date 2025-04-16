import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { LoginParamList } from "./paramList";
import { LoginFlowRouter } from "./interfaces/LoginFlowRouter.interface";
import { LoginFlowRouterDelegate } from "./interfaces/LoginFlowRouterDelegate.interface";

export class LoginFlowRouterImpl implements LoginFlowRouter {
  constructor(
    private nav: NativeStackNavigationProp<LoginParamList>,
    private delegate?: LoginFlowRouterDelegate
  ) {}

  openLogin() {
    console.log("Navigating to login");
  }

  openSMSVerification() {
    this.nav.navigate("SMSVerification", { phoneNumber: "1234567" });
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
