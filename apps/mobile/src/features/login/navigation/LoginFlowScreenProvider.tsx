import { NavigationProp } from "@react-navigation/native";
import { FlowScreenProvider } from "../../../navigation/types/FlowScreenProvider";

import * as Flow from "./types/flowTypes";
import { ResourceManager } from "./types/ResourceManager";

export function LoginFlowScreenProvider<T extends Flow.ParamList>({
  navigation,
  routerDelegate,
  screenName,
  children,
}: {
  navigation: NavigationProp<T>;
  routerDelegate: Flow.Delegate;
  screenName: string;
  children: (controller: Flow.Controller) => JSX.Element;
}) {
  const manager = ResourceManager.getInstance<T>();

  return (
    <FlowScreenProvider
      navigation={navigation}
      routerDelegate={routerDelegate}
      screenName={screenName}
      resourceManager={manager}
      children={children}
    />
  );
}
