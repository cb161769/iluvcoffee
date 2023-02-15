import { LoggingMiddleware } from './middleware/logging.middleware';
import { ConfigModule } from '@nestjs/config';
import { ApiKeyGuard } from './guards/api-key.guard';
import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { DatabaseModule } from './database/database.module';

@Module({
    imports:[ConfigModule,DatabaseModule],providers:[{provide:APP_GUARD,useClass:ApiKeyGuard}]})
export class CommonModule {
    configure(consumer:MiddlewareConsumer){
        consumer.apply(LoggingMiddleware).forRoutes({path:'*', method: RequestMethod.ALL});
    }
}
