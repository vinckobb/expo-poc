import * as Flow from "./Flow";

// ViewModel actions
import { WelcomeViewModelAction, AboutViewModelAction } from "../screens";

export class WelcomeFlowControllerImpl implements Flow.Controller {
  static readonly displayName: string = "WelcomeFlowControllerImpl";

  constructor(private router: Flow.Router) {}

  handleWelcomeAction(action: WelcomeViewModelAction) {
    switch (action.type) {
      case "home":
        this.router.openHome();
        break;

      case "login":
        this.router.openLogin();
        break;
    }
  }

  handleAboutAction(action: AboutViewModelAction): void {
    // GUARD: Unimplemented functionality (navigation) [@dmitry.kovalev]
  }

  // Lifecycle methods
  dispose() {
    console.log("Welcome flow disposed");
  }
}
