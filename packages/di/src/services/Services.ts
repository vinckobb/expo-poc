import { QueryClient } from "@tanstack/react-query";
import {
  HttpClient,
  AxiosHttpClient,
} from "@monorepo/infrastructure/networking";
import {
  NetworkService,
  NetworkServiceImpl,
} from "@monorepo/infrastructure/networking";
import {
  LocalStorage,
  AsyncLocalStorage,
} from "@monorepo/infrastructure/storage";
import { DataLayerFactory, DataLayerConfig } from "@monorepo/data-access";
import { RoutesService } from "@monorepo/data-access";
import { createbaseUrl } from "@monorepo/data-access";

export interface Services {
  get queryClient(): QueryClient;
  get httpClient(): HttpClient;
  get networkService(): NetworkService;
  get localStorage(): LocalStorage;
  get routesService(): RoutesService;
}

export class ServicesImpl implements Services {
  private _queryClient!: QueryClient;
  private _httpClient!: HttpClient;
  private _networkService!: NetworkService;
  private _localStorage!: LocalStorage;
  private _routesService!: RoutesService;

  constructor() {
    this.initializeInfrastructure();
    this.initializeDomainServices();
  }

  private initializeInfrastructure(): void {
    this._queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: 1,
          staleTime: 10000,
        },
      },
    });

    this._networkService = new NetworkServiceImpl();
    this._localStorage = new AsyncLocalStorage();
    this._httpClient = new AxiosHttpClient();
  }

  private initializeDomainServices(): void {
    const config: DataLayerConfig = {
      baseUrl: createbaseUrl(),
    };

    this._routesService = DataLayerFactory.createRoutesService(
      config,
      this._queryClient,
      this._httpClient,
      this._networkService,
      this._localStorage
    );
  }

  get queryClient(): QueryClient {
    return this._queryClient;
  }

  get httpClient(): HttpClient {
    return this._httpClient;
  }

  get networkService(): NetworkService {
    return this._networkService;
  }

  get localStorage(): LocalStorage {
    return this._localStorage;
  }

  get routesService(): RoutesService {
    return this._routesService;
  }
}
