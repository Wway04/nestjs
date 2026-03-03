import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './entities/user.entity';
import { BullModule } from '@nestjs/bullmq';
import { UserProcessor } from './user.processor';
import { USER_QUEUE } from './user.constants';


@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    BullModule.registerQueue({
      name: USER_QUEUE.name,
      prefix: 'user-queue'
    })
  ],
  controllers: [UsersController],
  providers: [UsersService, UserProcessor],
})
export class UsersModule { }
