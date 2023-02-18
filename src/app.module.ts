import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CommonModule } from './common/common.module';
import { BackofficeModule } from './backoffice/backoffice.module';
import * as Joi from '@hapi/joi';
@Module({
  imports:
    [
      ConfigModule.forRoot(
        {
          envFilePath: '.env',
          validationSchema: Joi.object({
            DATABASE_HOST: Joi.required(),
            DATABASE_PORT: Joi.number().default(5432),
            DATABASE_USERNAME: Joi.required(),
            DATABASE_PASSWORD: Joi.required(),
            DATABASE_SYNCHRONIZE: Joi.boolean().default(false),
            DATABASE_USE_SSL : Joi.boolean().default(false),
          })
        }
      ),
      CommonModule,
      BackofficeModule,
    ],
  controllers: [],
  providers: [],
})
export class AppModule { }
