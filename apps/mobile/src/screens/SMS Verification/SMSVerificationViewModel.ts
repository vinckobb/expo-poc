import { BaseViewModel } from "../../navigation/types/BaseViewModel";

export type Action = { type: "successfulSMSConfirmation" };

export type Params = {};

export class SMSVerificationViewModel implements BaseViewModel {
  private onAction: ((action: Action) => void) | undefined;

  constructor(params: Params, onAction: (action: Action) => void) {
    this.onAction = onAction;
  }

  onActionButton() {
    console.log("SMSVerificationViewModel: onActionButton");
    this.onAction?.({ type: "successfulSMSConfirmation" });
  }

  dispose(): void {
    console.log("SMSVerificationViewModel: dispose");
    this.onAction = undefined;
  }
}
