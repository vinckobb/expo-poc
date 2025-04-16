export class WelcomeViewModel {
  private onAction: (() => void) | undefined;

  constructor(onAction: () => void) {
    this.onAction = onAction;
  }

  onActionButton() {
    console.log("WelcomeViewModel: onActionButton");
    this.onAction?.();
  }

  dispose(): void {
    console.log("WelcomeViewModel: dispose");
    this.onAction = undefined;
  }
}
