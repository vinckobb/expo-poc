export type Action = { type: "submitCode"; code: string };

export class SMSVerificationViewModel {
  phoneNumber: string;

  onAction?: (action: Action) => void;

  constructor(phoneNumber: string) {
    this.phoneNumber = phoneNumber;
  }
  
  onButtonPress() {
    console.log("SMS verification button pressed");
    this.onAction?.({ type: "submitCode", code: "12345678" });
  }
}
