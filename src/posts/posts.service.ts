import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { FindOptionsWhere, ILike, Repository } from 'typeorm';
import { QueryPostDto } from './dto/query-post.dto';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post) private postRepository: Repository<Post>,
  ) { }
  create(createPostDto: CreatePostDto) {
    console.log('createPostDto', createPostDto);

    const post = this.postRepository.create({
      ...createPostDto,
      user: { id: createPostDto.userId },
    });
    return this.postRepository.save(post);
  }

  async findAll(query: QueryPostDto) {
    const {
      page = 1,
      limit = 10,
      search,
      sortBy = 'createdAt',
      sortOrder = 'DESC',
      userId
    } = query;

    const where: FindOptionsWhere<Post> = {};
    if (userId) where.user = { id: userId };
    if (search) where.title = ILike(`%${search}%`);

    const [data, total] = await this.postRepository.findAndCount({
      where,
      order: { [sortBy]: sortOrder },
      skip: (page - 1) * limit,
      take: limit,
      relations: { user: true },
    });

    return {
      data,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      }
    };
  }

  findOne(id: number) {
    return this.postRepository.findOne({
      where: { id }
    });
  }

  findByUser(userId: number) {
    return this.postRepository.find({
      where: { user: { id: userId } },
    });
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return this.postRepository.update(id, updatePostDto);
  }

  remove(id: number) {
    return this.postRepository.softDelete(id);
  }
}
