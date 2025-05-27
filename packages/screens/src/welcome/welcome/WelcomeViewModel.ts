import { ViewModel } from "@monorepo/types";

export type Action =
  | { type: "home" }
  | { type: "about" }
  | { type: "login" }
  | { type: "routes" };

export type Params = undefined;

export class WelcomeViewModel implements ViewModel {
  private onAction: ((action: Action) => void) | undefined;

  constructor(onAction: (action: Action) => void) {
    this.onAction = onAction;
  }

  onHomeButton() {
    console.log("WelcomeViewModel: onHomeButton");
    this.onAction?.({ type: "home" });
  }

  onLoginButton() {
    console.log("WelcomeViewModel: onLoginButton");
    this.onAction?.({ type: "login" });
  }

  onAboutButton() {
    console.log("WelcomeViewModel: onAboutButton");
    this.onAction?.({ type: "about" });
  }

  onRoutesButton() {
    console.log("WelcomeViewModel: onRoutesButton");
    this.onAction?.({ type: "routes" });
  }

  dispose(): void {
    console.log("❌ WelcomeViewModel dispose");
    this.onAction = undefined;
  }
}
