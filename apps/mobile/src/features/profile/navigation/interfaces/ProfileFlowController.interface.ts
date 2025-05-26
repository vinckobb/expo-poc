import type { FlowController } from "../../../../navigation/types/FlowController";
import * as Actions from "../types/screenActions";

export interface ProfileFlowController extends FlowController {
  handleProfileAction(action: Actions.ProfilAction): void;
  handleSettingsAction(action: Actions.SettingsAction): void;
  handleSecuritySettingsAction(action: Actions.SecuritySettingsAction): void;
}
