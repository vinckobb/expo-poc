import { createBaseScreen } from "../../../navigation/types/FlowBaseScreen";
import { WelcomeViewModel, Welcome, Action } from "../../../screens/Welcome";
import { WelcomeParamList } from "../navigation/types/paramList";
import { WelcomeFlowController } from "../navigation/types/WelcomeFlowController.interface";

type ParamsType = WelcomeParamList["Welcome"];

export const WelcomeScreen = createBaseScreen<
  ParamsType,
  WelcomeViewModel,
  Action,
  WelcomeFlowController
>(
  Welcome,
  class WelcomeViewModelWrapper extends WelcomeViewModel {
    constructor(params: ParamsType, onAction: (action: Action) => void) {
      super(onAction);
    }
  },
  (controller, action) => controller.handleWelcomeAction(action)
);
