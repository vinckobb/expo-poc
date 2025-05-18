import type { FlowController } from "../../../../navigation/types/FlowController";
import type { Action as LoginViewModelAction } from "../../../../screens/Login/LoginViewModel";
import type { Action as SMSVerificationViewModelAction } from "../../../../screens/SMS Verification/SMSVerificationViewModel";

export interface LoginFlowController extends FlowController {
  handleLoginAction(action: LoginViewModelAction): void;
  handleSMSVerificationAction(action: SMSVerificationViewModelAction): void;
  handleSuccessfulLoginFlow(): void;
}
