import { ShellFlowRouterDelegate } from "./interfaces/ShellFlowRouterDelegate.interface";

export class ShellFlowController {
  private delegate: ShellFlowRouterDelegate;

  constructor(delegate: ShellFlowRouterDelegate) {
    this.delegate = delegate;
  }

  public openHomeTab(): void {
    this.delegate.openHomeTab();
  }

  public openRoutesTab(): void {
    this.delegate.openRoutesTab();
  }

  public openProfileTab(): void {
    this.delegate.openProfileTab();
  }
}
