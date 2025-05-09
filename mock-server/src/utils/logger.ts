import { mockConfig } from "../mock-config";

export const logger = {
  info: (message: string): void => {
    console.log(`[INFO]: ${message}`);
  },

  warn: (message: string): void => {
    console.warn(`[WARNING]: ${message}`);
  },

  error: (message: string): void => {
    console.error(`[ERROR]: ${message}`);
  },

  request: (method: string, url: string, query: any, body: any): void => {
    if (!mockConfig.logging.enabled) return;

    const prefix = mockConfig.logging.usePrefix ? "[REQUEST] " : "";
    console.log(`${prefix}${method} ${url}`);

    if (mockConfig.logging.requestDetails) {
      const queryPrefix = mockConfig.logging.usePrefix
        ? "[REQUEST QUERY] "
        : "";
      const bodyPrefix = mockConfig.logging.usePrefix ? "[REQUEST BODY] " : "";

      if (Object.keys(query).length > 0) {
        if (mockConfig.logging.usePrefix) {
          console.log(queryPrefix, query);
        } else {
          console.log(query);
        }
      }

      if (body && Object.keys(body).length > 0) {
        if (mockConfig.logging.usePrefix) {
          console.log(bodyPrefix, body);
        } else {
          console.log(body);
        }
      }
    }
  },

  response: (status: number, url: string, time: number, data: any): void => {
    if (!mockConfig.logging.enabled) return;
    if (!mockConfig.logging.logResponse) return;

    const prefix = mockConfig.logging.usePrefix ? "[RESPONSE] " : "";
    let responseLog = `${prefix}${status} ${url}`;
    if (mockConfig.logging.responseTime) {
      responseLog += ` (${time}ms)`;
    }
    console.log(responseLog);

    if (mockConfig.logging.responseLevel === "brief") {
      const infoPrefix = mockConfig.logging.usePrefix ? "[RESPONSE] " : "";
      let responseInfo = `${infoPrefix}Type: ${typeof data}`;
      if (typeof data === "object") {
        responseInfo += `, Size: ${JSON.stringify(data).length} chars`;
      }
      console.log(responseInfo);
    } else if (mockConfig.logging.responseLevel === "full") {
      const dataPrefix = mockConfig.logging.usePrefix ? "[RESPONSE DATA] " : "";
      if (mockConfig.logging.usePrefix) {
        console.log(dataPrefix, data);
      } else {
        console.log(data);
      }
    }
  },
};
