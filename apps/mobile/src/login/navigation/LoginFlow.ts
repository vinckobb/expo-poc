import { createFlow } from "../../temp/FlowBuilder";
import { LoginParamList } from "./paramList";
import { LoginFlowController } from "./LoginFlowController";
import { LoginRouter } from "./LoginRouter";
import Login from "../screens/Login.screen";
import SMSVerification from "../screens/SMSVerification.screen";

export const LoginFlow = createFlow<LoginParamList, LoginFlowController>({
  name: "LoginFlow",
  routeParams: {
    Login: undefined,
    SMSVerification: { phone: "" as string },
  },
  controllerFactory: (navigation) => {
    return new LoginFlowController(new LoginRouter(navigation));
  },
  screens: {
    Login,
    SMSVerification,
  },
});
