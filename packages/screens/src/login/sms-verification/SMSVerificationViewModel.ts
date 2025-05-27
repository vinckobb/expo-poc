import { ViewModel } from "@monorepo/types";

export type Action = { type: "successfulSMSConfirmation" };

export type Params = undefined;

export class SMSVerificationViewModel implements ViewModel {
  private onAction: ((action: Action) => void) | undefined;

  constructor(onAction: (action: Action) => void) {
    console.log("✳️ SMSVerificationViewModel init");
    this.onAction = onAction;
  }

  onActionButton() {
    console.log("SMSVerificationViewModel: onActionButton");
    this.onAction?.({ type: "successfulSMSConfirmation" });
  }

  dispose(): void {
    console.log("❌ SMSVerificationViewModel dispose");
    this.onAction = undefined;
  }
}
