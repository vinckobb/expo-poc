import { z } from "zod";
import { LoginScreens as Screens } from "./routesList";

// Param Schemas
const LoginParamsSchema = z.undefined();
const SMSVerificationParamsSchema = z.undefined();

// Params inferred Types
type LoginParams = z.infer<typeof LoginParamsSchema>;
type SMSVerificationParams = z.infer<typeof SMSVerificationParamsSchema>;

export type LoginParamList = {
  [Screens.LOGIN]: LoginParams;
  [Screens.SMS_VERIFICATION]: SMSVerificationParams;
};

export const LoginParamSchemas = {
  [Screens.LOGIN]: LoginParamsSchema,
  [Screens.SMS_VERIFICATION]: SMSVerificationParamsSchema,
};
