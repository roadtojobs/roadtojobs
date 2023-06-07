import express from 'express';
import env from '@appEnv';
import authMiddleware from './middlewares/auth.middleware';
import protectedRoutes from './routes';
import closeUserClientMiddleware from './middlewares/closeUserClient.middleware';

export default async function initServer() {
  const app = express();
  const port = Number(env.appPort) || 3333;

  app.use(express.json());

  app.get('/', (req, res) => {
    res.status(200).json({
      name: 'The Road To Jobs Application',
    });
  });

  app.use('/healthz', (req, res) => {
    res.status(200).json({ ok: true });
  });

  app.use('/', authMiddleware, protectedRoutes, closeUserClientMiddleware);

  await app.listen(port);
  console.log(
    `\x1b[32mExpress Server started on http://localhost:${port} port.`
  );
}
