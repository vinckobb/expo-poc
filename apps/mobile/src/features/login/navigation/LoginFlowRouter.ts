import { NavigationProp } from "@react-navigation/native";

import * as FlowType from "./types/flowTypes";

export class LoginFlowRouterImpl<T extends FlowType.ParamList>
  implements FlowType.Router
{
  static readonly displayName: string = "WelcomeFlowRouterImpl";

  constructor(
    private nav: NavigationProp<T>,
    private delegate?: FlowType.Delegate
  ) {}

  openLogin() {
    this.nav.navigate(FlowType.Screens.LOGIN, undefined);
    console.log("Navigating to login");
  }

  openSMSVerification() {
    this.nav.navigate(FlowType.Screens.SMS_VERIFICATION, undefined);
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
