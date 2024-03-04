import http from 'http';
import express from 'express';

import { applyMiddleware, applyRoutes } from './utils';
import middleware from './middleware';
import routes from './features';
import errorHandlers from './middleware/errorHandlers';

const app = express();
const { PORT = 3000 } = process.env;

applyMiddleware({ middleware, app });
applyRoutes({ routes, router: app });
applyMiddleware({ middleware: errorHandlers,  app });

const server = http.createServer(app);
server.listen(PORT, () =>
  console.log(`Server is running on http://localhost:${PORT}...`)
);
  
export default server;