import { NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
export declare class UnsureAdmin implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction): Promise<void>;
}
