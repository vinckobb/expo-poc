import { ViewModel } from "@monorepo/types";

export class PasswordRecoveryViewModel implements ViewModel {
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
