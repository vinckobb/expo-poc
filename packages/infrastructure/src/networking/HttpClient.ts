export interface RequestConfig {
  headers?: Record<string, string>;
  params?: Record<string, string | number | boolean>;
  signal?: AbortSignal;
  timeout?: number;
  acceptsEmptyResponse?: boolean;
  enableLogging?: boolean;
}

export interface HttpClient {
  get<T>(url: string, config?: RequestConfig): Promise<T>;
  post<T>(url: string, body?: unknown, config?: RequestConfig): Promise<T>;
  put<T>(url: string, body?: unknown, config?: RequestConfig): Promise<T>;
  delete<T>(url: string, config?: RequestConfig): Promise<T>;
}

export class FetchHttpClient implements HttpClient {
  private static globalLoggingEnabled = false;

  constructor(private defaultConfig: RequestConfig = {}) {}

  static setGlobalLogging(enabled: boolean): void {
    FetchHttpClient.globalLoggingEnabled = enabled;
  }

  static get isGlobalLoggingEnabled(): boolean {
    return FetchHttpClient.globalLoggingEnabled;
  }

  async get<T>(url: string, config?: RequestConfig): Promise<T> {
    return this.request<T>("GET", url, undefined, config);
  }

  async post<T>(
    url: string,
    body?: unknown,
    config?: RequestConfig
  ): Promise<T> {
    return this.request<T>("POST", url, body, config);
  }

  async put<T>(
    url: string,
    body?: unknown,
    config?: RequestConfig
  ): Promise<T> {
    return this.request<T>("PUT", url, body, config);
  }

  async delete<T>(url: string, config?: RequestConfig): Promise<T> {
    return this.request<T>("DELETE", url, undefined, config);
  }

  private async request<T>(
    method: string,
    url: string,
    body?: unknown,
    config?: RequestConfig
  ): Promise<T> {
    const requestId = this.generateRequestId();
    const mergedConfig = { ...this.defaultConfig, ...config };
    const enableLogging =
      mergedConfig.enableLogging ?? FetchHttpClient.globalLoggingEnabled;

    if (enableLogging) {
      console.log(`[HTTP ${requestId}] ${method} ${url}`);
    }

    try {
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          ...mergedConfig.headers,
        },
        body: body ? JSON.stringify(body) : undefined,
        signal: mergedConfig.timeout
          ? AbortSignal.timeout(mergedConfig.timeout)
          : undefined,
      });

      return this.handleResponse<T>(
        response,
        requestId,
        mergedConfig.acceptsEmptyResponse,
        enableLogging
      );
    } catch (error) {
      if (enableLogging) {
        console.error(`[HTTP ${requestId}] Request failed:`, error);
      }
      throw error;
    }
  }

  private async handleResponse<T>(
    response: Response,
    requestId: string,
    acceptsEmptyResponse: boolean = false,
    enableLogging: boolean = false
  ): Promise<T> {
    if (enableLogging) {
      console.log(`[HTTP ${requestId}] Response status: ${response.status}`);
    }

    if (!response.ok) {
      const errorText = await response.text();
      if (enableLogging) {
        console.error(`[HTTP ${requestId}] Error response:`, errorText);
      }
      throw new Error(`HTTP ${response.status}: ${errorText}`);
    }

    const text = await response.text();
    if (enableLogging) {
      console.log(`[HTTP ${requestId}] Response text length: ${text.length}`);
    }

    if (!text.trim()) {
      if (acceptsEmptyResponse) {
        return undefined as T;
      }
      throw new Error(
        `[HTTP ${requestId}] Empty response when content was expected`
      );
    }

    try {
      const result = JSON.parse(text);
      if (enableLogging) {
        console.log(`[HTTP ${requestId}] Response received`);
      }
      return result;
    } catch (parseError) {
      if (enableLogging) {
        console.error(`[HTTP ${requestId}] Failed to parse JSON:`, parseError);
      }
      throw new Error(`[HTTP ${requestId}] Invalid JSON response`);
    }
  }

  private generateRequestId(): string {
    return Math.random().toString(36).substring(2, 9);
  }
}
