import * as FlowType from "./types/flowTypes";
import * as Screens from "../screens";

export function createWelcomeFlowScreens<T extends FlowType.ParamList>(
  Stack: FlowType.Stack<T>,
  delegate: FlowType.Delegate
) {
  return (
    <Stack.Group>
      {Screens.Wecome.stackScreen(Stack, delegate)}
      {Screens.About.stackScreen(Stack, delegate)}
    </Stack.Group>
  );
}
