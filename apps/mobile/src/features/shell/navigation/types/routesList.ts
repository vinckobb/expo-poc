export const ShellScreens = {
  SHELL: "Shell",
} as const;

export type ShellScreensName = (typeof ShellScreens)[keyof typeof ShellScreens];
