import type { FlowController } from "../../../../navigation/types/FlowController";
import * as Actions from "../types/screenActions";

export interface WelcomeFlowController extends FlowController {
  handleWelcomeAction(action: Actions.WelcomeAction): void;
  handleAboutAction(action: Actions.AboutAction): void;
}
