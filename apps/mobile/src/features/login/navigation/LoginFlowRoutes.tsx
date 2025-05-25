import * as FlowType from "./types/flowTypes";
import * as Screens from "../screens";

export function createLoginFlowScreens<T extends FlowType.ParamList>(
  Stack: FlowType.Stack<T>,
  delegate: FlowType.Delegate
) {
  return (
    <Stack.Group>
      {Screens.Login.stackScreen(Stack, delegate)}
      {Screens.SMSVerification.stackScreen(Stack, delegate)}
    </Stack.Group>
  );
}
