import { UserLog } from './models/user/user-log.model';
import { UserAccount } from './models/user/user-account.model';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { UserType } from './models/user/user-type.model';

@Module({
    imports: [
        TypeOrmModule.forFeature([UserAccount,UserLog,UserType])
    ]
})
export class BackofficeModule {}
