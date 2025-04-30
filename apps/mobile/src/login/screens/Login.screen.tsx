import { createBaseScreen } from "./LoginFlow.baseScreen";
import { Login, LoginViewModel, Action } from "../../screens/Login";
import { LoginParamList } from "../navigation/paramList";

type ParamsType = LoginParamList["Login"];

export const LoginScreen = createBaseScreen<ParamsType, LoginViewModel, Action>(
  Login,
  LoginViewModel,
  (controller, action) => controller.handleLoginAction(action)
);
