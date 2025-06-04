import React, { useRef } from "react";
import { ShellFlowRouterDelegate } from "../navigation/interfaces/ShellFlowRouterDelegate.interface";
import { ShellFlowController } from "../navigation/ShellFlowController";
import { TabNavigator } from "./TabNavigator";
import { DIContainer } from "@monorepo/di";

interface ShellScreenProps {
  delegate: ShellFlowRouterDelegate;
  di: DIContainer; 
}

export const ShellScreen: React.FC<ShellScreenProps> = ({ delegate, di }) => {
  // GUARD: Possible bad solution [@dmitry.kovalev]
  const controller = useRef(new ShellFlowController(delegate));

  return (
    <TabNavigator controller={controller.current} di={di} />
  );
};
