import { Router,Application, Request, Response, NextFunction } from 'express';

type Wrapper = (app: Application) => void;

export const applyMiddleware = ({ middleware, app }: { middleware: Wrapper[]; app: Application; }) => {
  for (const f of middleware) {
    f(app);
  }
};

type Handler = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void> | void;

type Route = {
  path: string;
  method: string;
  handler: Handler | Handler[];
};

export const applyRoutes = ({ routes, router }: { routes: Route[]; router: Router; }) => {
  for (const route of routes) {
    const { path, method, handler } = route;
    (router as any)[method](path, handler);
  }
};
