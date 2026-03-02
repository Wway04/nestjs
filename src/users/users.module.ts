import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './entities/user.entity';
import { BullModule } from '@nestjs/bullmq';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    BullModule.registerQueue({
      name: 'user-queue',
      prefix: 'user-queue'
    })
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule { }
