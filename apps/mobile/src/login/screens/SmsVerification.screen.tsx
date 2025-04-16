import { useMemo, useEffect } from "react";
import { LoginFlowControllerImpl } from "../navigation/LoginFlowController";
import {
  SMSVerification,
  SMSVerificationViewModel,
} from "../../screens/SMS Verification";
import { LoginParamList } from "../navigation/paramList";

type ParamsType = LoginParamList["SMSVerification"];

function useCreateViewModel(
  controller: LoginFlowControllerImpl,
  params: ParamsType | undefined
) {
  return useMemo(() => {
    const safeParams = params || { phoneNumber: "" };

    const vm = new SMSVerificationViewModel(safeParams, (action) =>
      controller.handleSMSVerificationAction(action)
    );

    return vm;
  }, [controller, params]);
}

export const SMSVerificationScreen = ({
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

  return <SMSVerification viewModel={viewModel} />;
};
