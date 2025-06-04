import { Services, ServicesImpl } from "../services";

export interface DIContainer {
  get services(): Services;
}

export class DIContainerImpl implements DIContainer {
  private _services: Services;

  constructor() {
    this._services = new ServicesImpl();
  }

  get services(): Services {
    return this._services;
  }
}
