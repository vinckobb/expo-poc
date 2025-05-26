import * as FlowType from "./types/flowTypes";

export class ProfileFlowControllerImpl implements FlowType.Controller {
  static readonly displayName: string = "ProfileFlowControllerImpl";

  constructor(private router: FlowType.Router) {}

  handleProfileAction(action: FlowType.Actions.ProfilAction): void {
    console.log("");
    this.router.openSettings();
  }

  handleSettingsAction(action: FlowType.Actions.SettingsAction): void {
    console.log("");
    this.router.openSecutitySettings();
  }

  handleSecuritySettingsAction(
    action: FlowType.Actions.SecuritySettingsAction
  ): void {
    console.log("");
  }
  // Lifecycle methods
  dispose() {
    console.log("❌ Profile flow disposed");
  }
}
