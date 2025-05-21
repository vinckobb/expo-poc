import { ViewModel } from "../../navigation/types/ViewModel";

export class PasswordRecoveryViewModel {
  private onAction: (() => void) | undefined;

  constructor(onAction: () => void) {
    this.onAction = onAction;
  }

  onActionButton() {
    console.log("PasswordRecoveryViewModel: onActionButton");
    this.onAction?.();
  }

  dispose(): void {
    console.log("❌ PasswordRecoveryViewModel dispose");
    this.onAction = undefined;
  }
}
