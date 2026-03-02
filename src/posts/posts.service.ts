import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post) private postRepository: Repository<Post>,
  ) {}
  create(createPostDto: CreatePostDto) {
    console.log('createPostDto', createPostDto);
    
    const post = this.postRepository.create({
      ...createPostDto,
      user: { id: createPostDto.userId },
    });
    return this.postRepository.save(post);
  }

  findAll() {
    return this.postRepository.find();
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
