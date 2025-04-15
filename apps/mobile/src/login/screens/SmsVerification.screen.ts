import { LoginFlowController } from "../navigation/LoginFlowController";
import {
  SMSVerification,
  SMSVerificationViewModel,
} from "../../screens/SMSVerification";

export default {
  screen: SMSVerification,
  createViewModel: (controller: LoginFlowController) => {
    // GUARD: Temp code [@dmitry.kovalev]
    const vm = new SMSVerificationViewModel("12345678");
    vm.onAction = controller.handleSMSVerificationAction.bind(controller);
    return vm;
  },
};
