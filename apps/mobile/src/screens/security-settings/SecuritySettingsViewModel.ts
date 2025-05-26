export type Action = { type: "settings" };

export type Params = undefined;

export class ProfileViewModel {
  private onAction: ((action: Action) => void) | undefined;

  constructor(onAction: (action: Action) => void) {
    console.log("✳️ ProfileViewModel init");
    this.onAction = onAction;
  }

  onSettingsButton() {
    console.log("ProfileViewModel: onSettingsButton");
    this.onAction?.({ type: "settings" });
  }

  dispose(): void {
    console.log("❌ ProfileViewModel dispose");
    this.onAction = undefined;
  }
}

export class SecuritySettingsViewModel {
  private onAction: ((action: Action) => void) | undefined;

  twoFactorEnabled = false;
  biometricAuthEnabled = false;
  oldPassword = "";
  newPassword = "";
  confirmPassword = "";
  deactivateAfterInactivity = false;

  constructor(onAction: (action: Action) => void) {
    console.log("✳️ SecuritySettingsViewModel init");
    this.onAction = onAction;
  }

  setTwoFactorEnabled = (value: boolean) => {
    this.twoFactorEnabled = value;
  };

  setBiometricAuthEnabled = (value: boolean) => {
    this.biometricAuthEnabled = value;
  };

  setOldPassword = (value: string) => {
    this.oldPassword = value;
  };

  setNewPassword = (value: string) => {
    this.newPassword = value;
  };

  setConfirmPassword = (value: string) => {
    this.confirmPassword = value;
  };

  setDeactivateAfterInactivity = (value: boolean) => {
    this.deactivateAfterInactivity = value;
  };

  onSavePassword = () => {
    console.log("SecuritySettingsViewModel: onSavePassword");
    if (this.newPassword !== this.confirmPassword) {
      console.log("Passwords do not match");
      return;
    }
    if (this.oldPassword === "" || this.newPassword === "") {
      console.log("Empty passwords");
      return;
    }
    console.log("Password changed successfully");
  };

  onBackToSettings = () => {
    console.log("SecuritySettingsViewModel: onBackToSettings");
    this.onAction?.({ type: "settings" });
  };

  dispose(): void {
    console.log("❌ SecuritySettingsViewModel dispose");
    this.onAction = undefined;
  }
}
