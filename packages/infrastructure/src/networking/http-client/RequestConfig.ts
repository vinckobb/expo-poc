export interface RequestConfig {
  headers?: Record<string, string>;
  params?: Record<string, string | number | boolean>;
  signal?: AbortSignal;
  timeout?: number;
  acceptsEmptyResponse?: boolean;
  enableLogging?: boolean;
}
