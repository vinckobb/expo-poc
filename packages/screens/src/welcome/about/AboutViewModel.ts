import { ViewModel } from "@monorepo/types";

export type Action = { type: "home" } | { type: "contact" };

export type Params = undefined;

export class AboutViewModel implements ViewModel {
  private onAction: ((action: Action) => void) | undefined;

  constructor(onAction: (action: Action) => void) {
    console.log("✳️ AboutViewModel init");
    this.onAction = onAction;
  }

  onHomeButton() {
    console.log("AboutViewModel: onHomeButton");
    this.onAction?.({ type: "home" });
  }

  onContactButton() {
    console.log("AboutViewModel: onContactButton");
    this.onAction?.({ type: "contact" });
  }

  dispose(): void {
    console.log("❌ AboutViewModel dispose");
    this.onAction = undefined;
  }
}
