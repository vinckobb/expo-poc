import { NavigationProp } from "@react-navigation/native";
import { LoginParamList } from "./paramList";
import { LoginFlowRouterDelegate } from "./interfaces/LoginFlowRouterDelegate.interface";
import { LoginFlowController } from "./interfaces/LoginFlowController.interface";
import { LoginFlowRouter } from "./interfaces/LoginFlowRouter.interface";
import { LoginFlowControllerImpl } from "./LoginFlowController";
import { LoginFlowRouterImpl } from "./LoginFlowRouter";

export class LoginFlowResourceManager<T extends LoginParamList> {
  private static instance: LoginFlowResourceManager<LoginParamList> | null =
    null;
  private routerInstance: LoginFlowRouter | null = null;
  private controllerInstance: LoginFlowController | null = null;
  private activeScreens = 0;

  private constructor() {}

  static getInstance<P extends LoginParamList>(): LoginFlowResourceManager<P> {
    if (!LoginFlowResourceManager.instance) {
      console.log("Creating new LoginFlowResourceManager instance");
      LoginFlowResourceManager.instance =
        new LoginFlowResourceManager<LoginParamList>();
    }
    return LoginFlowResourceManager.instance as LoginFlowResourceManager<P>;
  }

  registerScreen(): void {
    this.activeScreens++;
    console.log(`Screen registered. Active screens: ${this.activeScreens}`);
  }

  unregisterScreen(): void {
    this.activeScreens--;
    console.log(
      `Screen unregistered. Active screens: ${this.activeScreens}`
    );

    if (this.activeScreens <= 0) {
      this.cleanup();
    }
  }

  setupRouter(
    navigation: NavigationProp<T>,
    delegate: LoginFlowRouterDelegate
  ): void {
    if (!this.routerInstance) {
      console.log("Creating new LoginFlowRouter instance");
      this.routerInstance = new LoginFlowRouterImpl<T>(navigation, delegate);
    }
  }

  getRouter(): LoginFlowRouter {
    if (!this.routerInstance) {
      throw new Error("Router must be initialized before use");
    }
    return this.routerInstance;
  }

  getController(): LoginFlowController {
    if (!this.controllerInstance && this.routerInstance) {
      console.log("Creating new LoginFlowController instance");
      this.controllerInstance = new LoginFlowControllerImpl(
        this.routerInstance
      );
    }

    if (!this.controllerInstance) {
      throw new Error("Router must be initialized before controller");
    }

    return this.controllerInstance;
  }

  cleanup(): void {
    console.log("Cleaning up login flow resources");

    if (this.controllerInstance) {
      console.log("Destroying controller instance");
      this.controllerInstance = null;
    }

    if (this.routerInstance) {
      console.log("Destroying router instance");
      this.routerInstance = null;
    }

    this.activeScreens = 0;
    LoginFlowResourceManager.instance = null;
  }
}
