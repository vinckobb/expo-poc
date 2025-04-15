export type Action = { type: "submitPhone"; phone: string };

export class LoginViewModel {
  onAction?: (action: Action) => void;

  onButtonPress() {
    this.onAction?.({ type: "submitPhone", phone: "12345678" });
  }
}
