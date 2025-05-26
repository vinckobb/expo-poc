export type Action = { type: "home" } | { type: "contact" };

export type Params = undefined;

export class ProfileViewModel {
  private onAction: ((action: Action) => void) | undefined;

  constructor(onAction: (action: Action) => void) {
    console.log("✳️ ProfileViewModel init");
    this.onAction = onAction;
  }

  onSettingsButton() {
    console.log("ProfileViewModel: onSettingsButton");
    this.onAction?.({ type: "contact" });
  }

  dispose(): void {
    console.log("❌ ProfileViewModel dispose");
    this.onAction = undefined;
  }
}
