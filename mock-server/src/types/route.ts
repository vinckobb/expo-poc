import { RequestHandler } from "express";

export interface Route {
  method: string;
  path: string;
  handler: RequestHandler;
}
