import { ViewModel } from "../../navigation/types/ViewModel";

export type Action = { type: "successfulSMSConfirmation" };

export type Params = undefined;

export class SMSVerificationViewModel implements ViewModel {
  private onAction: ((action: Action) => void) | undefined;

  constructor(params: Params, onAction: (action: Action) => void) {
    this.onAction = onAction;
  }

  onActionButton() {
    console.log("SMSVerificationViewModel: onActionButton");
    this.onAction?.({ type: "successfulSMSConfirmation" });
  }

  dispose(): void {
    console.log("SMSVerificationViewModel dispose");
    this.onAction = undefined;
  }
}
