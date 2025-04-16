import { useMemo, useEffect } from "react";
import { LoginFlowControllerImpl } from "../navigation/LoginFlowController";
import { Login, LoginViewModel } from "../../screens/Login";
import { LoginParamList } from "../navigation/paramList";

type ParamsType = LoginParamList["Login"];

function useCreateViewModel(
  controller: LoginFlowControllerImpl,
  params: ParamsType
) {
  return useMemo(() => {
    const vm = new LoginViewModel(params, (action) => {
      console.log("Action received:", action);
      controller.handleLoginAction(action);
    });
    console.log("LoginViewModel instance created:", vm.instanceId);
    return vm;
  }, [controller, params]);
}

export const LoginScreen = ({
  controller,
  params,
}: {
  controller: LoginFlowControllerImpl;
  params: ParamsType;
}) => {
  const viewModel = useCreateViewModel(controller, params);

  useEffect(() => {
    return () => viewModel.dispose?.();
  }, [viewModel]);

  return <Login viewModel={viewModel} />;
};
