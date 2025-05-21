import { NavigationProp } from "@react-navigation/native";

import * as FlowType from "./types/flowTypes";

export class WelcomeFlowRouterImpl<T extends FlowType.ParamList>
  implements FlowType.Router
{
  static readonly displayName: string = "WelcomeFlowRouterImpl";

  constructor(
    private nav: NavigationProp<T>,
    private delegate?: FlowType.Delegate
  ) {}

  openWelcome() {
    this.nav.navigate(FlowType.Screens.WELCOME, undefined);
    console.log("Navigating to welcome");
  }

  openAbout() {
    this.nav.navigate(FlowType.Screens.ABOUT, undefined);
    console.log("Navigating to about");
  }

  openLogin() {
    console.log("Navigating to login via delegate");
    this.delegate?.openLogin();
  }

  openHome() {
    console.log("Navigating to home via delegate");
    this.delegate?.openHome();
  }

  openRoutes() {
    console.log("Navigating to home via delegate");
    this.delegate?.openRoutes();
  }
}
