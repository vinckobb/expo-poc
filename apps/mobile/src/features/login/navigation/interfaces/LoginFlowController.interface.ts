import type { FlowController } from "../../../../navigation/types/FlowController";
import * as Actions from "../types/screenActions";

export interface LoginFlowController extends FlowController {
  handleLoginAction(action: Actions.LoginAction): void;
  handleSMSVerificationAction(action: Actions.SMSVerificationAction): void;
  handleSuccessfulLoginFlow(): void;
}
