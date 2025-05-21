import * as Flow from "./types/flowTypes";
import { WelcomeViewModelAction, AboutViewModelAction } from "../screens";

function assertUnreachable(x: never): never {
  throw new Error(`Didn't expect to get here: ${x}`);
}

function exhaustiveCheck<T extends never>(x: T): never {
  throw new Error(`Unexpected value: ${x}`);
}

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

      case "about":
        this.router.openAbout();
        break;
      
      case "routes":
        this.router.openRoutes();
        break;
    }
  }

  handleAboutAction(action: AboutViewModelAction): void {
    // GUARD: Unimplemented functionality (navigation) [@dmitry.kovalev]
  }

  // Lifecycle methods
  dispose() {
    console.log(`❌ ${WelcomeFlowControllerImpl.displayName} flow disposed`);
  }
}
