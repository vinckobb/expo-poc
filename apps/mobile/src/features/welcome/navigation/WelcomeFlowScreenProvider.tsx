import { NavigationProp, useNavigation } from "@react-navigation/native";
import { FlowScreenProvider } from "../../../navigation/types/FlowScreenProvider";

import * as FlowType from "./types/flowTypes";
import { ResourceManager } from "./types/ResourceManager";

export function WelcomeFlowScreenProvider<T extends FlowType.ParamList>({
  routerDelegate,
  screenName,
  children,
}: {
  routerDelegate: FlowType.Delegate;
  screenName: string;
  children: (controller: FlowType.Controller) => JSX.Element;
}) {
  const manager = ResourceManager.getInstance<T>();
  const navigation = useNavigation<NavigationProp<T>>();

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
