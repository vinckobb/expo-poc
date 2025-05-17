import { useMemo, useEffect } from "react";
import { BaseViewModel } from "./BaseViewModel";

export function createBaseScreen<
  TParams,
  TViewModel extends BaseViewModel,
  TAction,
  TController
>(
  Component: React.ComponentType<{ viewModel: TViewModel }>,
  ViewModelClass: new (
    params: TParams,
    onAction: (action: TAction) => void
  ) => TViewModel,
  actionHandler: (controller: TController, action: TAction) => void
) {
  return ({
    controller,
    params,
  }: {
    controller: TController;
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