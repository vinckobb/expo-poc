import { NavigationProp } from "@react-navigation/native";
import { WelcomeParamList } from "./types/paramList";
import { WelcomeFlowRouterDelegate } from "./types/WelcomeFlowRouterDelegate.interface";
import { WelcomeFlowController } from "./types/WelcomeFlowController.interface";
import { WelcomeFlowResourceManager } from "./WelcomeFlowResourceManager";
import { FlowScreenProvider } from "../../../navigation/types/FlowScreenProvider";
import { useEffect, useRef } from "react";

export function useWelcomeFlowRegisterScreen<T extends WelcomeParamList>() {
  const manager = WelcomeFlowResourceManager.getInstance<T>();
  const isRegisteredRef = useRef(false);

  useEffect(() => {
    if (!isRegisteredRef.current) {
      manager.registerScreen();
      isRegisteredRef.current = true;
    }

    return () => {
      if (isRegisteredRef.current) {
        manager.unregisterScreen();
        isRegisteredRef.current = false;
      }
    };
  }, []);
}

export function useWelcomeFlowController<T extends WelcomeParamList>(
  navigation: NavigationProp<T>,
  routerDelegate: WelcomeFlowRouterDelegate
) {
  const manager = WelcomeFlowResourceManager.getInstance<T>();
  manager.setupRouter(navigation, routerDelegate);
  return manager.getController();
}

export function WelcomeFlowScreenProvider<T extends WelcomeParamList>({
  navigation,
  routerDelegate,
  screenName,
  children,
}: {
  navigation: NavigationProp<T>;
  routerDelegate: WelcomeFlowRouterDelegate;
  screenName: string;
  children: (controller: WelcomeFlowController) => JSX.Element;
}) {
  const manager = WelcomeFlowResourceManager.getInstance<T>();

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
