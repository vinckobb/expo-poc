import type { FlowController } from "../../../../navigation/types/FlowController";
import type { Action as WelcomeViewModelAction } from "../../../../screens/Welcome/WelcomeViewModel";
import type { Action as AboutViewModelAction } from "../../../../screens/About/AboutViewModel";

export interface WelcomeFlowController extends FlowController {
  handleWelcomeAction(action: WelcomeViewModelAction): void;
  handleAboutAction(action: AboutViewModelAction): void;
}
