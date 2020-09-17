import Routes from "../routes";
import { Application, Request, Response, NextFunction } from "express";

export default function routeLoader(expressApp: Application): Application {
  for (const route of Routes) {
    expressApp[route.method](
      route.route,
      async (req: Request, res: Response, next: NextFunction) => {
        const result = await new (route.controller as any)()[route.action](
          req,
          res,
          next
        );
        if (result) return result;
      }
    );
  }
  return expressApp;
}
