export type Action =
  | { type: "login" }
  | { type: "home" }

export class WelcomeViewModel {
  private onAction: ((action: Action) => void) | undefined;

  constructor(onAction: (action: Action) => void) {
    this.onAction = onAction;
  }

  onHomeButton() {
    console.log("WelcomeViewModel: onActionButton");
    this.onAction?.({ type: "home" });
  }

  onLoginButton() {
    console.log("WelcomeViewModel: onActionButton");
    this.onAction?.({ type: "login" });
  }

  dispose(): void {
    console.log("WelcomeViewModel: dispose");
    this.onAction = undefined;
  }
}
