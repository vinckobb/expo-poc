export interface RequestConfig {
  headers?: Record<string, string>;
  params?: Record<string, string>;
  acceptsEmptyResponse?: boolean;
}

export interface HttpClient {
  get<T>(url: string, config?: RequestConfig): Promise<T>;
  post<T, D = unknown>(
    url: string,
    data: D,
    config?: RequestConfig
  ): Promise<T>;
  put<T, D = unknown>(url: string, data: D, config?: RequestConfig): Promise<T>;
  delete<T>(url: string, config?: RequestConfig): Promise<T>;
}

export class FetchHttpClient implements HttpClient {
  constructor(
    private baseUrl: string,
    private enableLogging = false
  ) {}

  private async handleResponse<T>(
    response: Response,
    requestId: string,
    acceptsEmptyResponse: boolean = false
  ): Promise<T> {
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    try {
      const text = await response.text();
      if (!text.trim()) {
        if (acceptsEmptyResponse) {
          return null as T;
        }
        throw new Error("Empty response from server");
      }
      return JSON.parse(text) as T;
    } catch (error: unknown) {
      console.error("JSON parse error:", error);
      console.error("Response status:", response.status);
      console.error("Response URL:", response.url);
      throw new Error(
        `Failed to parse response as JSON: ${error instanceof Error ? error.message : "Unknown error"}`
      );
    }
  }

  private logRequest(
    method: string,
    url: string,
    data?: unknown,
    headers?: Record<string, string>
  ): string {
    if (!this.enableLogging) return "";

    const requestId =
      Date.now().toString(36) + Math.random().toString(36).substr(2);

    let logMessage = `${method} ${this.baseUrl}${url}`;

    const urlObj = new URL(`${this.baseUrl}${url}`);
    if (urlObj.search) {
      logMessage += `\nPARAMS: ${urlObj.search.substring(1)}`;
    }

    if (headers && Object.keys(headers).length > 0) {
      logMessage += `\nHEADERS: ${JSON.stringify(headers)}`;
    }

    if (data !== undefined) {
      logMessage += `\nBODY: ${JSON.stringify(data)}`;
    }

    console.log(`[${requestId}]\n${logMessage}`);

    return requestId;
  }

  async get<T>(url: string, config?: RequestConfig): Promise<T> {
    const fullUrl = this.getUrlWithParams(url, config?.params);
    const headers = {
      "Content-Type": "application/json",
      ...config?.headers,
    };

    const requestId = this.logRequest("GET", fullUrl, undefined, headers);

    const response = await fetch(`${this.baseUrl}${fullUrl}`, {
      method: "GET",
      headers,
    });

    return this.handleResponse<T>(
      response,
      requestId,
      config?.acceptsEmptyResponse
    );
  }

  async post<T, D = unknown>(
    url: string,
    data: D,
    config?: RequestConfig
  ): Promise<T> {
    const fullUrl = this.getUrlWithParams(url, config?.params);
    const headers = {
      "Content-Type": "application/json",
      ...config?.headers,
    };

    const requestId = this.logRequest("POST", fullUrl, data, headers);

    const response = await fetch(`${this.baseUrl}${fullUrl}`, {
      method: "POST",
      headers,
      body: JSON.stringify(data),
    });

    return this.handleResponse<T>(
      response,
      requestId,
      config?.acceptsEmptyResponse
    );
  }

  async put<T, D = unknown>(
    url: string,
    data: D,
    config?: RequestConfig
  ): Promise<T> {
    const fullUrl = this.getUrlWithParams(url, config?.params);
    const headers = {
      "Content-Type": "application/json",
      ...config?.headers,
    };

    const requestId = this.logRequest("PUT", fullUrl, data, headers);

    const response = await fetch(`${this.baseUrl}${fullUrl}`, {
      method: "PUT",
      headers,
      body: JSON.stringify(data),
    });

    return this.handleResponse<T>(
      response,
      requestId,
      config?.acceptsEmptyResponse
    );
  }

  async delete<T>(url: string, config?: RequestConfig): Promise<T> {
    const fullUrl = this.getUrlWithParams(url, config?.params);
    const headers = {
      "Content-Type": "application/json",
      ...config?.headers,
    };

    const requestId = this.logRequest("DELETE", fullUrl, undefined, headers);

    const response = await fetch(`${this.baseUrl}${fullUrl}`, {
      method: "DELETE",
      headers,
    });

    return this.handleResponse<T>(
      response,
      requestId,
      config?.acceptsEmptyResponse
    );
  }

  private getUrlWithParams(
    url: string,
    params?: Record<string, string>
  ): string {
    if (!params) return url;

    const searchParams = new URLSearchParams();

    for (const [key, value] of Object.entries(params)) {
      searchParams.append(key, value);
    }

    const queryString = searchParams.toString();
    return queryString ? `${url}?${queryString}` : url;
  }
}
