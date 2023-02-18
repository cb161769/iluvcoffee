import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';
@Injectable()
export class RequestMiddleware implements NestMiddleware {
  constructor(private readonly logger: Logger) {}
  use(req: Request, res: Response, next: NextFunction) {
    if (req.headers['requestId'] == null) {
      req.headers['requestId'] = uuidv4();
      this.logger.log({
        requestId: req.headers['requestId'],
        serviceName: `RequestMiddleware`,
        description: `Se ha generado el requestId ${req.headers['requestId']} debido a que no existe este valor  en el request`,
      });
    }
    next();
  }
}
