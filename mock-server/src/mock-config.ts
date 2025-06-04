export const mockConfig = {
  port: 3000,
  baseUrl: "http://localhost",
  logging: {
    enabled: false,
    usePrefix: false,
    requestDetails: false,
    logResponse: false,
    responseTime: true,
    // Response log detail level: none (no body info) | brief (type, size) | full (complete body)
    responseLevel: "none" as "none" | "brief" | "full",
  },
};
