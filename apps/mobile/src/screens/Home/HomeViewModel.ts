export class HomeViewModel {
  private onAction: (() => void) | undefined;

  constructor(onAction: () => void) {
    this.onAction = onAction;
  }

  onActionButton() {
    console.log("HomeViewModel: onActionButton");
    this.onAction?.();
  }

  dispose(): void {
    console.log("HomeViewModel: dispose");
    this.onAction = undefined;
  }
}
