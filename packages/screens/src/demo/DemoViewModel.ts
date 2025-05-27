import { ViewModel } from "@monorepo/types";

export type Action = { type: "home" };

export type Params = { id: string };

export class DemoViewModel implements ViewModel {
  private onAction: ((action: Action) => void) | undefined;

  constructor(onAction: (action: Action) => void) {
    this.onAction = onAction;
  }

  onHomeButton() {
    console.log("DemoViewModel: onHomeButton");
    this.onAction?.({ type: "home" });
  }

  dispose(): void {
    console.log("❌ DemoViewModel dispose");
    this.onAction = undefined;
  }
}
