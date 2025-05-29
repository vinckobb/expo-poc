import { QueryClient } from '@tanstack/react-query';
import { RoutesService } from '../../domain/services/RoutesService';
import { RoutesServiceImpl } from '../../data/services/RoutesServiceImpl';
import { RoutesRepositoryMain } from '../../data/repositories/RoutesRepositoryMain';
import { RoutesRepositoryHTTP } from '../../data/repositories/RoutesRepositoryHTTP';
import { RoutesRepositoryLocal } from '../../data/repositories/RoutesRepositoryLocal';
import { RoutesAPI } from '../../data/api/RoutesAPI';
import { HttpClient } from '../networking/HttpClient';
import { NetworkService } from '../networking/NetworkService';
import { LocalStorage } from '../storage/LocalStorage';

export interface DataLayerConfig {
  baseUrl: string;
}

export class DataLayerFactory {
  static createRoutesService(
    config: DataLayerConfig,
    queryClient: QueryClient,
    httpClient: HttpClient,
    networkService: NetworkService,
    localStorage: LocalStorage
  ): RoutesService {
    const api = new RoutesAPI(httpClient, config.baseUrl);
    const httpRepo = new RoutesRepositoryHTTP(api, queryClient);
    const localRepo = new RoutesRepositoryLocal(localStorage);
    const mainRepo = new RoutesRepositoryMain(httpRepo, localRepo, networkService);

    return new RoutesServiceImpl(mainRepo);
  }
}