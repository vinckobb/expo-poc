import type { WelcomeParamList } from "./types/paramList";
import { WelcomeFlowRouter } from "./types/WelcomeFlowRouter.interface";
import { WelcomeFlowRouterDelegate } from "./types/WelcomeFlowRouterDelegate.interface";
import { NavigationProp } from "@react-navigation/native";

export class WelcomeFlowRouterImpl<T extends WelcomeParamList>
  implements WelcomeFlowRouter
{
  static readonly displayName: string = "WelcomeFlowRouterImpl";

  constructor(
    private nav: NavigationProp<T>,
    private delegate?: WelcomeFlowRouterDelegate
  ) {}

  openWelcome() {
    this.nav.navigate("Welcome", undefined);
    console.log("Navigating to welcome");
  }

  openAbout() {
    this.nav.navigate("About", undefined);
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
}
