import { Router, Application } from 'express';
import cors from 'cors';
import parser from 'body-parser';
import compression from 'compression';
import morgamBody from 'morgan-body';

export const handleCors = (router: Router) =>
  router.use(cors({ credentials: true, origin: true }));

export const handleBodyRequestParsing = (router: Router) => {
  router.use(parser.urlencoded({ extended: true }));
  router.use(parser.json());
};

export const handleCompression = (router: Router) => router.use(compression());

export const morganBodyParser = (router: Router) => morgamBody(router as Application);
