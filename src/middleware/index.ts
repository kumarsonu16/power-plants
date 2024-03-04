import {
  handleCors,
  handleBodyRequestParsing,
  handleCompression,
  morganBodyParser
} from './common';

import { handleAPIDocs } from './apiDocs';

export default [
  handleCors,
  handleBodyRequestParsing,
  handleCompression,
  morganBodyParser,
  handleAPIDocs
];
