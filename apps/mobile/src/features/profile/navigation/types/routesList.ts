export const ProfileScreens = {
  PROFILE: "Profil",
  SETTINGS: "Settings",
  SECURITY_SETTINGS: "SecuritySettings",
} as const;

export type ProfileScreenName = (typeof ProfileScreens)[keyof typeof ProfileScreens];
