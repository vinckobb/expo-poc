export class WelcomeViewModel {
  onButtonPress() {
    console.log("Welcome button pressed");
    this.onAction();
  }

  onAction() {
    console.log("Navigating to Login");
    // Add navigation logic here
  }
}
