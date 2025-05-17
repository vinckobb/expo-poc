import { useEffect, useRef } from "react";
import { NavigationProp, useIsFocused } from "@react-navigation/native";
import { FlowResourceManager } from "./FlowResourceManager";

export function useFlowRegisterScreen<
  TParamList extends Record<string, object | undefined>,
  TRouter,
  TController,
  TRouterDelegate
>(
  resourceManager: FlowResourceManager<TParamList, TRouter, TController, TRouterDelegate>
) {
  const isFocused = useIsFocused();
  const isRegisteredRef = useRef(false);

  useEffect(() => {
    if (!isRegisteredRef.current) {
      resourceManager.registerScreen();
      isRegisteredRef.current = true;
    }

    return () => {
      if (isRegisteredRef.current) {
        resourceManager.unregisterScreen();
        isRegisteredRef.current = false;
      }
    };
  }, []);

  return isFocused;
}

export function useFlowController<
  TParamList extends Record<string, object | undefined>,
  TRouter,
  TController,
  TRouterDelegate
>(
  navigation: NavigationProp<TParamList>,
  routerDelegate: TRouterDelegate,
  resourceManager: FlowResourceManager<TParamList, TRouter, TController, TRouterDelegate>
): TController {
  resourceManager.setupRouter(navigation, routerDelegate);
  return resourceManager.getController();
}

export interface FlowScreenProviderProps<
  TParamList extends Record<string, object | undefined>,
  TRouter,
  TController,
  TRouterDelegate
> {
  navigation: NavigationProp<TParamList>;
  routerDelegate: TRouterDelegate;
  screenName: string;
  resourceManager: FlowResourceManager<TParamList, TRouter, TController, TRouterDelegate>;
  children: (controller: TController) => JSX.Element;
}

export function FlowScreenProvider<
  TParamList extends Record<string, object | undefined>,
  TRouter,
  TController,
  TRouterDelegate
>({
  navigation,
  routerDelegate,
  screenName,
  resourceManager,
  children,
}: FlowScreenProviderProps<TParamList, TRouter, TController, TRouterDelegate>) {
  console.log(`📱 Rendering ${screenName} screen`);
  useFlowRegisterScreen(resourceManager);
  const controller = useFlowController(navigation, routerDelegate, resourceManager);
  return children(controller);
}