import * as FlowType from "./types/flowTypes";

export class WelcomeFlowControllerImpl implements FlowType.Controller {
  static readonly displayName: string = "WelcomeFlowControllerImpl";

  constructor(private router: FlowType.Router) {}

  handleWelcomeAction(action: FlowType.Actions.WelcomeAction) {
    switch (action.type) {
      case "home":
        this.router.openHome();
        break;

      case "login":
        this.router.openLogin();
        break;

      case "about":
        this.router.openAbout();
        break;

      case "routes":
        this.router.openRoutes();
        break;
    }
  }

  handleAboutAction(action: FlowType.Actions.AboutAction): void {
    // GUARD: Unimplemented functionality (navigation) [@dmitry.kovalev]
  }

  // Lifecycle methods
  dispose() {
    console.log(`❌ ${WelcomeFlowControllerImpl.displayName} flow disposed`);
  }
}
