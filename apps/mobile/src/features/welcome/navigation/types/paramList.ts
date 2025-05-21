import { z } from "zod";
import { WelcomeScreens as Screens } from "./routesList";

// Param Schemas
const WelcomeParamsSchema = z.undefined();
const AboutParamsSchema = z.undefined();

// Params inferred Types
type WelcomeParams = z.infer<typeof WelcomeParamsSchema>;
type AboutParams = z.infer<typeof AboutParamsSchema>;

export type WelcomeParamList = {
  [Screens.WELCOME]: WelcomeParams;
  [Screens.ABOUT]: AboutParams;
};

export const WelcomeParamSchemas = {
  [Screens.WELCOME]: WelcomeParamsSchema,
  [Screens.ABOUT]: AboutParamsSchema,
};