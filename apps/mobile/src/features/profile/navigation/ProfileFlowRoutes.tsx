import * as FlowType from "./types/flowTypes";
import * as Screens from "../screens";

export function createProfileFlowScreens<T extends FlowType.ParamList>(
  Stack: FlowType.Stack<T>,
  delegate: FlowType.Delegate
) {
  return (
    <Stack.Group>
      {Screens.Profile.stackScreen(Stack, delegate)}
      {Screens.Settings.stackScreen(Stack, delegate)}
      {Screens.SecuritySettings.stackScreen(Stack, delegate)}
    </Stack.Group>
  );
}