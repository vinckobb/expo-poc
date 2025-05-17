import {
  ControllerClass,
  FlowResourceManager,
  ResourceState,
  ResourceStateManager,
  RouterClass,
} from "../../../navigation/types/FlowResourceManager";
import { WelcomeFlowController as Controller } from "./types/WelcomeFlowController.interface";
import { WelcomeFlowRouter as Router } from "./types/WelcomeFlowRouter.interface";
import { WelcomeFlowRouterDelegate as Delegate } from "./types/WelcomeFlowRouterDelegate.interface";
import { WelcomeParamList as ParamList } from "./types/paramList";
import { WelcomeFlowControllerImpl } from "./WelcomeFlowController";
import { WelcomeFlowRouterImpl } from "./WelcomeFlowRouter";

class FlowResourceStateManager
  implements ResourceStateManager<Router, Controller>
{
  private static state: ResourceState<Router, Controller> = {
    routerInstance: null,
    controllerInstance: null,
    activeScreens: 0,
  };

  getState() {
    return FlowResourceStateManager.state;
  }

  updateState(state: typeof FlowResourceStateManager.state): void {
    FlowResourceStateManager.state = state;
  }

  resetState(): void {
    FlowResourceStateManager.state = {
      routerInstance: null,
      controllerInstance: null,
      activeScreens: 0,
    };
  }
}

class FlowResourceManagerImpl<T extends ParamList> extends FlowResourceManager<
  T,
  Router,
  Controller,
  Delegate
> {
  private static stateManager = new FlowResourceStateManager();

  private constructor() {
    super(FlowResourceManagerImpl.stateManager);
  }

  static getInstance<P extends ParamList>(): FlowResourceManagerImpl<P> {
    return new FlowResourceManagerImpl<P>();
  }

  protected getRouterClass(): RouterClass<T, Router, Delegate> {
    return WelcomeFlowRouterImpl;
  }

  protected getControllerClass(): ControllerClass<Controller, Router> {
    return WelcomeFlowControllerImpl;
  }
}

export { FlowResourceManagerImpl as WelcomeFlowResourceManager };
