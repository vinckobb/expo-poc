import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { LoginParamList } from "./paramList";

export class LoginRouter {
  constructor(private nav: NativeStackNavigationProp<LoginParamList>) {}

  // navigateToSmsVerification(phone: string) {
  //   this.nav.navigate("SmsVerification", { phone });
  // }

  backToLogin() {
    this.nav.navigate("Login");
  }
}
