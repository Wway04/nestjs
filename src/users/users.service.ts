import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { USER_QUEUE } from './user.constants';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectQueue(USER_QUEUE.name) private userQueue: Queue,
  ) { }

  async create(createUserDto: CreateUserDto) {
    const user = this.userRepository.create(createUserDto);
    const savedUser = await this.userRepository.save(user);

    await this.userQueue.add(USER_QUEUE.jobs.SEND_WELCOME_EMAIL, {
      userId: savedUser.id,
      email: savedUser.email,
      name: savedUser.name
    }, {
      attempts: 3,
      backoff: {
        type: 'exponential',
        delay: 1000,
      }
    });

    return savedUser;
  }

  findAll() {
    return this.userRepository.find();
  }

  findOne(id: number) {
    return this.userRepository.findOne({ where: { id } });
  }

  async findOneWithPosts(id: number) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) return null;
    const posts = await user.posts;
    return { ...user, posts };
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.userRepository.update(id, updateUserDto);
  }

  remove(id: number) {
    return this.userRepository.softDelete({ id });
  }
}
