import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { HttpClient } from "./HttpClient";
import { RequestConfig } from "./RequestConfig";

export class AxiosHttpClient implements HttpClient {
  private static globalLoggingEnabled = false;

  constructor(private defaultConfig: RequestConfig = {}) {}

  static setGlobalLogging(enabled: boolean): void {
    AxiosHttpClient.globalLoggingEnabled = enabled;
  }

  static get isGlobalLoggingEnabled(): boolean {
    return AxiosHttpClient.globalLoggingEnabled;
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
      mergedConfig.enableLogging ?? AxiosHttpClient.globalLoggingEnabled;

    if (enableLogging) {
      console.log(`[HTTP ${requestId}] ${method} ${url}`);
    }

    try {
      const axiosConfig: AxiosRequestConfig = {
        method: method as any,
        url,
        data: body,
        headers: mergedConfig.headers,
        params: mergedConfig.params,
        signal: mergedConfig.signal,
        timeout: mergedConfig.timeout,
      };

      const response: AxiosResponse<T> = await axios(axiosConfig);

      if (enableLogging) {
        console.log(`[HTTP ${requestId}] Response status: ${response.status}`);
      }

      if (!response.data && !mergedConfig.acceptsEmptyResponse) {
        throw new Error(
          `[HTTP ${requestId}] Empty response when content was expected`
        );
      }

      if (enableLogging) {
        console.log(`[HTTP ${requestId}] Response received`);
      }

      return response.data;
    } catch (error) {
      if (enableLogging) {
        console.error(`[HTTP ${requestId}] Request failed:`, error);
      }
      throw error;
    }
  }

  private generateRequestId(): string {
    return Math.random().toString(36).substring(2, 9);
  }
}
