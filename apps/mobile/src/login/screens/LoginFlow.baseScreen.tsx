import { useMemo, useEffect } from "react";
import { LoginFlowController } from "../navigation/interfaces/LoginFlowController.interface";
import { ViewModel } from "../../navigation/types/ViewModel";

export function createBaseScreen<
  TParams,
  TViewModel extends ViewModel,
  TAction,
>(
  Component: React.ComponentType<{ viewModel: TViewModel }>,
  ViewModelClass: new (
    params: TParams,
    onAction: (action: TAction) => void
  ) => TViewModel,
  actionHandler: (controller: LoginFlowController, action: TAction) => void
) {
  return ({
    controller,
    params,
  }: {
    controller: LoginFlowController;
    params: TParams;
  }) => {
    const viewModel = useMemo(() => {
      return new ViewModelClass(params, (action) =>
        actionHandler(controller, action)
      );
    }, [controller, params]);

    useEffect(() => {
      return () => viewModel.dispose?.();
    }, [viewModel]);

    return <Component viewModel={viewModel} />;
  };
}
