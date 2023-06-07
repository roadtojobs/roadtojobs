import { NextFunction, Request, RequestHandler, Response } from 'express';

export default function withAsyncErrorHandling(
  handler: (req: Request, res: Response, next: NextFunction) => void
): RequestHandler {
  return async (req, res, next) => {
    try {
      await handler(req, res, next);
    } catch (e) {
      console.error(e);

      res.status(500).json({
        error:
          'There was an issue while processing your request. Please try again',
      });
    }
  };
}
