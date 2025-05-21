export const WelcomeScreens = {
  WELCOME: "Welcome",
  ABOUT: "About",
} as const;

export type WelcomeScreenName = (typeof WelcomeScreens)[keyof typeof WelcomeScreens];
