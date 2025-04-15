import { Login, LoginViewModel } from "../../screens/Login";
import { LoginFlowController } from "../navigation/LoginFlowController";

export default {
  screen: Login,
  createViewModel: (controller: LoginFlowController) => {
    const vm = new LoginViewModel();
    vm.onAction = controller.handleLoginAction.bind(controller);
    return vm;
  },
};
