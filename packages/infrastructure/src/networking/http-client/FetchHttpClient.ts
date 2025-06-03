import { HttpClient } from "./HttpClient";
import { RequestConfig } from "./RequestConfig";

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

    const finalUrl = this.buildUrlWithParams(url, mergedConfig.params);
    const finalSignal = this.buildSignal(mergedConfig);

    if (enableLogging) {
      console.log(`[HTTP ${requestId}] ${method} ${finalUrl}`);
    }

    try {
      const response = await fetch(finalUrl, {
        method,
        headers: this.buildHeaders(body, mergedConfig.headers),
        body: this.buildBody(body),
        signal: finalSignal,
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

  private buildUrlWithParams(
    url: string,
    params?: Record<string, string | number | boolean>
  ): string {
    if (!params || Object.keys(params).length === 0) {
      return url;
    }

    const urlObj = new URL(url);
    Object.entries(params).forEach(([key, value]) => {
      urlObj.searchParams.set(key, String(value));
    });

    return urlObj.toString();
  }

  private buildSignal(config: RequestConfig): AbortSignal | undefined {
    if (config.signal) {
      return config.signal;
    }

    if (config.timeout) {
      return AbortSignal.timeout(config.timeout);
    }

    return undefined;
  }

  private buildHeaders(
    body: unknown,
    userHeaders?: Record<string, string>
  ): Record<string, string> {
    const headers: Record<string, string> = { ...userHeaders };

    if (body && !headers["Content-Type"]) {
      if (body instanceof FormData) {
        // FormData sets Content-Type automatically with boundary
      } else if (typeof body === "string") {
        headers["Content-Type"] = "text/plain";
      } else {
        headers["Content-Type"] = "application/json";
      }
    }

    return headers;
  }

  private buildBody(body: unknown): string | FormData | undefined {
    if (!body) {
      return undefined;
    }

    if (body instanceof FormData) {
      return body;
    }

    if (typeof body === "string") {
      return body;
    }

    return JSON.stringify(body);
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
