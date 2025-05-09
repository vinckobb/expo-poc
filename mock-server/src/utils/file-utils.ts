import fs from "fs";
import path from "path";
import { logger } from "./index";

export const readJsonFile = <T>(filePath: string, defaultValue: T): T => {
  try {
    if (!fs.existsSync(filePath)) {
      logger(`File not found: ${filePath}, using default value`);
      return defaultValue;
    }

    const data = fs.readFileSync(filePath, "utf8");
    return JSON.parse(data) as T;
  } catch (error) {
    logger(`Error reading file ${filePath}: ${error}`);
    return defaultValue;
  }
};

export const writeJsonFile = <T>(filePath: string, data: T): boolean => {
  try {
    const dirPath = path.dirname(filePath);

    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }

    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf8");
    return true;
  } catch (error) {
    logger(`Error writing file ${filePath}: ${error}`);
    return false;
  }
};
