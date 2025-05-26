export type Action = { type: "security" };

export type Params = undefined;

export class SettingsViewModel {
  private onAction: ((action: Action) => void) | undefined;

  showLocalTicketsOnly = false;
  marketingMessages = true;
  pushNotifications = true;
  autoTicketDownload = false;

  constructor(onAction: (action: Action) => void) {
    console.log("✳️ SettingsViewModel init");
    this.onAction = onAction;
  }

  setShowLocalTicketsOnly = (value: boolean) => {
    this.showLocalTicketsOnly = value;
  };

  setMarketingMessages = (value: boolean) => {
    this.marketingMessages = value;
  };

  setPushNotifications = (value: boolean) => {
    this.pushNotifications = value;
  };

  setAutoTicketDownload = (value: boolean) => {
    this.autoTicketDownload = value;
  };

  onSecuritySettingsButton = () => {
    console.log("SettingsViewModel: onSecuritySettingsButton");
    this.onAction?.({ type: "security" });
  };

  dispose(): void {
    console.log("❌ SettingsViewModel dispose");
    this.onAction = undefined;
  }
}
