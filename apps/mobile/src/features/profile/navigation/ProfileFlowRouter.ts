import { NavigationProp } from "@react-navigation/native";

import * as FlowType from "./types/flowTypes";

export class ProfileFlowRouterImpl<T extends FlowType.ParamList>
  implements FlowType.Router
{
  static readonly displayName: string = "ProfileFlowRouterImpl";

  constructor(
    private nav: NavigationProp<T>,
    private delegate?: FlowType.Delegate
  ) {}

  openProfil(): void {
    console.log("Navigating to Profil");
      this.nav.navigate(FlowType.Screens.PROFILE, undefined);
  
  }

  openSettings(): void {
    console.log("Navigating to Settings");
    this.nav.navigate(FlowType.Screens.SETTINGS, undefined);
  }

  openSecutitySettings(): void {
    console.log("Navigating to Secutity Settings");
    this.nav.navigate(FlowType.Screens.SECURITY_SETTINGS, undefined);
  }
}
