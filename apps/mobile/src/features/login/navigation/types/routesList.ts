export const LoginScreens = {
  LOGIN: "Login",
  SMS_VERIFICATION: "SMSVerification",
} as const;

export type LoginScreenName = (typeof LoginScreens)[keyof typeof LoginScreens];
