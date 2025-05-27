import {
  ControllerClass,
  RouterClass,
  FlowResourceManager,
  FlowResourceStateManager,
} from "@monorepo/mobile-core/navigation";

import * as FlowType from "../types/flowTypes";
import { RouterImpl } from "../types/flowAliases";
import { ControllerImpl } from "../types/flowAliases";

export class FlowResourceManagerImpl<
  T extends FlowType.ParamList,
> extends FlowResourceManager<
  T,
  FlowType.Router,
  FlowType.Controller,
  FlowType.Delegate
> {
  private static stateManager = new FlowResourceStateManager<
    FlowType.Router,
    FlowType.Controller
  >();

  private constructor() {
    super(FlowResourceManagerImpl.stateManager);
  }

  static getInstance<
    P extends FlowType.ParamList,
  >(): FlowResourceManagerImpl<P> {
    return new FlowResourceManagerImpl<P>();
  }

  protected getRouterClass(): RouterClass<
    T,
    FlowType.Router,
    FlowType.Delegate
  > {
    return RouterImpl;
  }

  protected getControllerClass(): ControllerClass<
    FlowType.Controller,
    FlowType.Router
  > {
    return ControllerImpl;
  }
}
