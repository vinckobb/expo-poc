export type Action = { type: "home" };

export class DemoViewModel {
  private onAction: ((action: Action) => void) | undefined;

  constructor(onAction: (action: Action) => void) {
    this.onAction = onAction;
  }

  onHomeButton() {
    console.log("DemoViewModel: onHomeButton");
    this.onAction?.({ type: "home" });
  }

  dispose(): void {
    console.log("DemoViewModel dispose");
    this.onAction = undefined;
  }
}
