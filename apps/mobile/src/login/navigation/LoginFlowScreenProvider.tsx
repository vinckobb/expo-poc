import { useEffect, useRef } from "react";
import { NavigationProp, useIsFocused } from "@react-navigation/native";
import { LoginParamList } from "./paramList";
import { LoginFlowRouterDelegate } from "./interfaces/LoginFlowRouterDelegate.interface";
import { LoginFlowController } from "./interfaces/LoginFlowController.interface";
import { LoginFlowResourceManager } from "./LoginFlowResourceManager";

export function useLoginFlowRegisterScreen<T extends LoginParamList>() {
  const isFocused = useIsFocused();
  const manager = LoginFlowResourceManager.getInstance<T>();
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

  return isFocused;
}

export function useLoginFlowController<T extends LoginParamList>(
  navigation: NavigationProp<T>,
  routerDelegate: LoginFlowRouterDelegate
) {
  const manager = LoginFlowResourceManager.getInstance<T>();
  manager.setupRouter(navigation, routerDelegate);
  return manager.getController();
}

export function LoginFlowScreenProvider<T extends LoginParamList>({
  navigation,
  routerDelegate,
  screenName,
  children,
}: {
  navigation: NavigationProp<T>;
  routerDelegate: LoginFlowRouterDelegate;
  screenName: string;
  children: (controller: LoginFlowController) => JSX.Element;
}) {
  console.log(`📱 Rendering ${screenName} screen`);
  useLoginFlowRegisterScreen<T>();
  const controller = useLoginFlowController(navigation, routerDelegate);
  return children(controller);
}
