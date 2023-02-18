import { RequestMiddleware } from './middleware/logging.middleware';
import { ConfigModule } from '@nestjs/config';
import { ApiKeyGuard } from './guards/api-key.guard';
import { Logger, MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { DatabaseModule } from './database/database.module';

@Module({
    imports: [ConfigModule,DatabaseModule], providers: [{ provide: APP_GUARD, useClass: ApiKeyGuard },Logger]
})
export class CommonModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(RequestMiddleware).forRoutes({ path: '*', method: RequestMethod.ALL });
    }
}
