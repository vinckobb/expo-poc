import { createBaseScreen } from "../../../navigation/types/FlowBaseScreen";
import { About, AboutViewModel, Action } from "../../../screens/About";
import { WelcomeParamList } from "../navigation/types/paramList";
import { WelcomeFlowController } from "../navigation/types/WelcomeFlowController.interface";

type ParamsType = WelcomeParamList["About"];

export const AboutScreen = createBaseScreen<
  ParamsType,
  AboutViewModel,
  Action,
  WelcomeFlowController
>(
  About,
  class WelcomeViewModelWrapper extends AboutViewModel {
    constructor(params: ParamsType, onAction: (action: Action) => void) {
      super(onAction);
    }
  },
  (controller, action) => controller.handleAboutAction(action)
);
