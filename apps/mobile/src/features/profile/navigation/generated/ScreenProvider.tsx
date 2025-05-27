import { NavigationProp, useNavigation } from "@react-navigation/native";
import { FlowScreenProvider } from "@monorepo/mobile-core/navigation";

import * as FlowType from "../types/flowTypes";
import { ResourceManager } from "../types/flowAliases";

export function ProfileFlowScreenProvider<T extends FlowType.ParamList>({
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
