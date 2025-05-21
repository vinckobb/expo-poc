import { ViewModel } from "../../navigation/types/ViewModel";

export type Action =
  | { type: "successfulLogin" }
  | { type: "passwordRecovery" }
  | { type: "registration" };

export type Params = undefined;

export class LoginViewModel implements ViewModel {
  private onAction: ((action: Action) => void) | undefined;

  constructor(params: Params, onAction: (action: Action) => void) {
    console.log("✳️ LoginViewModel init");
    this.onAction = onAction;
  }

  onActionButton() {
    console.log("LoginViewModel: successfulLogin");
    this.onAction?.({ type: "successfulLogin" });
  }
  onPasswordRecovery() {
    console.log("LoginViewModel: passwordRecovery");
    this.onAction?.({ type: "passwordRecovery" });
  }
  onRegistration() {
    console.log("LoginViewModel: registration");
    this.onAction?.({ type: "registration" });
  }

  dispose(): void {
    console.log("❌ LoginViewModel dispose");
    this.onAction = undefined;
  }
}
