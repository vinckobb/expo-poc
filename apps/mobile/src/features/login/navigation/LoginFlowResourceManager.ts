import {
  ControllerClass,
  RouterClass,
  FlowResourceManager,
  FlowResourceStateManager,
} from "../../../navigation/types/FlowResourceManager";

import * as Flow from "./types/flowTypes";
import { RouterImpl } from "./types/RouterImpl";
import { ControllerImpl } from "./types/ControllerImpl";

export class FlowResourceManagerImpl<
  T extends Flow.ParamList,
> extends FlowResourceManager<T, Flow.Router, Flow.Controller, Flow.Delegate> {
  private static stateManager = new FlowResourceStateManager<
    Flow.Router,
    Flow.Controller
  >();

  private constructor() {
    super(FlowResourceManagerImpl.stateManager);
  }

  static getInstance<P extends Flow.ParamList>(): FlowResourceManagerImpl<P> {
    return new FlowResourceManagerImpl<P>();
  }

  protected getRouterClass(): RouterClass<T, Flow.Router, Flow.Delegate> {
    return RouterImpl;
  }

  protected getControllerClass(): ControllerClass<
    Flow.Controller,
    Flow.Router
  > {
    return ControllerImpl;
  }
}
