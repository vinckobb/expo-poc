import { WelcomeFlowController } from "./types/WelcomeFlowController.interface";
import { WelcomeFlowRouter } from "./types/WelcomeFlowRouter.interface";

// ViewModel actions
import type { Action as WelcomeViewModelAction } from "../../../screens/Welcome";
import { Action as AboutViewModelAction } from "../../../screens/About";

export class WelcomeFlowControllerImpl implements WelcomeFlowController {
  static readonly displayName: string = "WelcomeFlowControllerImpl";

  constructor(private router: WelcomeFlowRouter) {}

  start() {
    console.log("Welcome flow started");
    this.router.openWelcome();
  }

  dispose() {
    console.log("Welcome flow disposed");
  }

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
}
