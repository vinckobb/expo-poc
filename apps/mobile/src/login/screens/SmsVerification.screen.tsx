import { createBaseScreen } from "./LoginFlow.baseScreen";
import {
  SMSVerification,
  SMSVerificationViewModel,
  Action,
} from "../../screens/SMS Verification";
import { LoginParamList } from "../navigation/paramList";

type ParamsType = LoginParamList["SMSVerification"];

export const SMSVerificationScreen = createBaseScreen<
  ParamsType,
  SMSVerificationViewModel,
  Action
>(SMSVerification, SMSVerificationViewModel, (controller, action) =>
  controller.handleSMSVerificationAction(action)
);
