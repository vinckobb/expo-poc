import { useMemo, useEffect } from "react";
import { ViewModel } from "../../../../../packages/types/src/ViewModel";

type FlowScreenRenderer<TParams, TController> = ({
  controller,
  params,
}: {
  controller: TController;
  params: TParams;
}) => JSX.Element;

export function createFlowScreen<
  TParams,
  TViewModel extends ViewModel,
  TAction,
  TController,
>(
  Component: React.ComponentType<{ viewModel: TViewModel }>,
  viewModelFactory: (
    params: TParams,
    onAction: (action: TAction) => void
  ) => TViewModel,
  actionHandler: (controller: TController, action: TAction) => void
): FlowScreenRenderer<TParams, TController> {
  return ({ controller, params }) => {
    const viewModel = useMemo(
      () =>
        viewModelFactory(params, (action) => actionHandler(controller, action)),
      [controller, params]
    );

    useEffect(() => {
      return () => viewModel.dispose?.();
    }, [viewModel]);

    return <Component viewModel={viewModel} />;
  };
}
