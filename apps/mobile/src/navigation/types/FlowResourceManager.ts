import { NavigationProp } from "@react-navigation/native";

export interface RouterClass<
  TParamList extends Record<string, object | undefined>,
  TRouter,
  TRouterDelegate,
> {
  readonly displayName: string;
  new (
    navigation: NavigationProp<TParamList>,
    delegate: TRouterDelegate
  ): TRouter;
}

export interface ControllerClass<TController, TRouter> {
  readonly displayName: string;
  new (router: TRouter): TController;
}

export interface ResourceState<TRouter, TController> {
  routerInstance: TRouter | null;
  controllerInstance: TController | null;
  activeScreens: number;
}

export interface ResourceStateManager<TRouter, TController> {
  getState(): ResourceState<TRouter, TController>;
  updateState(state: ResourceState<TRouter, TController>): void;
  resetState(): void;
}

export class InstanceResourceStateManager<TRouter, TController>
  implements ResourceStateManager<TRouter, TController>
{
  private state: ResourceState<TRouter, TController> = {
    routerInstance: null,
    controllerInstance: null,
    activeScreens: 0,
  };

  getState(): ResourceState<TRouter, TController> {
    return this.state;
  }

  updateState(state: ResourceState<TRouter, TController>): void {
    this.state = state;
  }

  resetState(): void {
    this.state = {
      routerInstance: null,
      controllerInstance: null,
      activeScreens: 0,
    };
  }
}

export abstract class FlowResourceManager<
  TParamList extends Record<string, object | undefined>,
  TRouter,
  TController,
  TRouterDelegate,
> {
  private stateManager: ResourceStateManager<TRouter, TController>;

  protected constructor(
    stateManager: ResourceStateManager<TRouter, TController>
  ) {
    this.stateManager = stateManager;
  }

  registerScreen(): void {
    const state = this.stateManager.getState();
    const newState = {
      ...state,
      activeScreens: state.activeScreens + 1,
    };
    this.stateManager.updateState(newState);
    console.log(
      `📊 Screen registered. Active screens: ${newState.activeScreens}`
    );
  }

  unregisterScreen(): void {
    const state = this.stateManager.getState();
    const newState = {
      ...state,
      activeScreens: state.activeScreens - 1,
    };
    this.stateManager.updateState(newState);
    console.log(
      `📊 Screen unregistered. Active screens: ${newState.activeScreens}`
    );

    if (newState.activeScreens <= 0) {
      this.cleanup();
    }
  }

  setupRouter(
    navigation: NavigationProp<TParamList>,
    delegate: TRouterDelegate
  ): void {
    const state = this.stateManager.getState();
    if (!state.routerInstance) {
      const RouterClass = this.getRouterClass();
      console.log(`🔄 Creating new ${RouterClass.displayName} instance`);
      const routerInstance = new RouterClass(navigation, delegate);
      this.stateManager.updateState({
        ...state,
        routerInstance,
      });
    }
  }

  getRouter(): TRouter {
    const state = this.stateManager.getState();
    if (!state.routerInstance) {
      throw new Error("Router must be initialized before use");
    }
    return state.routerInstance;
  }

  getController(): TController {
    const state = this.stateManager.getState();
    if (!state.controllerInstance && state.routerInstance) {
      const ControllerClass = this.getControllerClass();
      console.log(`🔄 Creating new ${ControllerClass.displayName} instance`);
      const controllerInstance = new ControllerClass(state.routerInstance);

      this.stateManager.updateState({
        ...state,
        controllerInstance,
      });

      return controllerInstance;
    }

    if (!state.controllerInstance) {
      throw new Error("Router must be initialized before controller");
    }

    return state.controllerInstance;
  }

  cleanup(): void {
    console.log("🧹 Cleaning up flow resources");
    this.stateManager.resetState();
  }

  protected abstract getRouterClass(): RouterClass<
    TParamList,
    TRouter,
    TRouterDelegate
  >;

  protected abstract getControllerClass(): ControllerClass<
    TController,
    TRouter
  >;
}
