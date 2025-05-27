import type { FlowController } from "@monorepo/mobile-core/navigation";
import * as Actions from "../types/screenActions";

export interface WelcomeFlowController extends FlowController {
  handleWelcomeAction(action: Actions.WelcomeAction): void;
  handleAboutAction(action: Actions.AboutAction): void;
}
