import React, { useRef } from "react";
import { ShellFlowRouterDelegate } from "../navigation/types/ShellFlowRouterDelegate.interface";
import { ShellFlowController } from "../navigation/ShellFlowController";
import { TabNavigator } from "./TabNavigator";
import { useQueryClient } from "@tanstack/react-query";

interface ShellScreenProps {
  delegate: ShellFlowRouterDelegate;
}

export const ShellScreen: React.FC<ShellScreenProps> = ({ delegate }) => {
  // GUARD: Possible bad solution [@dmitry.kovalev]
  const controller = useRef(new ShellFlowController(delegate));

  // GUARD: Unimplemented functionality (deps?) [@dmitry.kovalev]
  const queryClient = useQueryClient();

  return (
    <TabNavigator controller={controller.current} queryClient={queryClient} />
  );
};
