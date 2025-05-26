import { z } from "zod";
import { ProfileScreens as Screens } from "./routesList";

// Param Schemas
const ProfilParamsSchema = z.undefined();
const SettingsParamsSchema = z.undefined();
const SecuritySettingsParamsSchema = z.undefined();

// Params inferred Types
type ProfilParamsParams = z.infer<typeof ProfilParamsSchema>;
type SettingsParams = z.infer<typeof SettingsParamsSchema>;
type SecuritySettingsParams = z.infer<typeof SecuritySettingsParamsSchema>;

export type ProfileParamList = {
  [Screens.PROFILE]: ProfilParamsParams;
  [Screens.SETTINGS]: SettingsParams;
  [Screens.SECURITY_SETTINGS]: SecuritySettingsParams;
};

export const ProfileParamSchemas = {
  [Screens.PROFILE]: ProfilParamsSchema,
  [Screens.SETTINGS]: SettingsParamsSchema,
  [Screens.SECURITY_SETTINGS]: SecuritySettingsParamsSchema,
};
