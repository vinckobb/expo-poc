export class HomeViewModel {
  onButtonPress() {
    console.log("Button pressed");
    this.onAction();
  }

  onAction() {
    console.log("Final screen reached");
    // Add navigation logic here
  }
}
