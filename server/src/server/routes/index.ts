import { Router } from 'express';
import withAsyncErrorHandling from './withAsyncErrorHandling';
import getLoggerInUserInfoHandler from './handlers/getLoggerInUserInfo.handler';

const routes = Router();

routes.get(
  '/getLoggedInUserInfo',
  withAsyncErrorHandling(getLoggerInUserInfoHandler)
);

export default routes;
