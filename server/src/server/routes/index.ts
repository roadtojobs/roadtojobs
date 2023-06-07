import { Router } from 'express';

const routes = Router();

routes.get('/getLoggedInUserInfo', (req, res) => {
  res.status(200).json('ok');
});

export default routes;
