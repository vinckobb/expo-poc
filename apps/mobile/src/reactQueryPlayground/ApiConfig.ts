import { Platform } from "react-native";
import { HttpClient, FetchHttpClient } from "./HttpClient";

export function createHttpClient(): HttpClient {
  // 'localhost' is not accessible on iOS simulator and Android emulator
  // For real devices you'll need external IP or domain
  let baseUrl = "http://localhost:3000/api";

  if (Platform.OS === "ios" && !__DEV__) {
    // Use real API for production
    baseUrl = "https://your-production-api.com/api";
  } else if (Platform.OS === "ios") {
    // Use localhost:8081 for iOS simulator
    baseUrl = "http://localhost:3000/api";
  } else if (Platform.OS === "android") {
    // For Android emulator 10.0.2.2 points to the host machine's localhost
    baseUrl = "http://10.0.2.2:3000/api";
  }

  return new FetchHttpClient(baseUrl, true);
}
