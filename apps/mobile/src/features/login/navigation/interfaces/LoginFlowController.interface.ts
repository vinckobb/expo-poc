import type { FlowController } from "@monorepo/mobile-core/navigation";
import * as Actions from "../types/screenActions";

export interface LoginFlowController extends FlowController {
  handleLoginAction(action: Actions.LoginAction): void;
  handleSMSVerificationAction(action: Actions.SMSVerificationAction): void;
  handleSuccessfulLoginFlow(): void;
}
