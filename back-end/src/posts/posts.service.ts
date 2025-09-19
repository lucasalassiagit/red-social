import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './post.entity';
import { User } from '../users/user.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post) private readonly postsRepository: Repository<Post>,
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
  ) {}

  async findAll() {
    return this.postsRepository.find({
      order:{
        createdAt: 'DESC',
      }
    });
  }

  async postsUsuario(userId: number) {
    return this.postsRepository.find({
      where: {
        user: { id: userId },
      },
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async createPost(dto: CreatePostDto) {
  try {
    const user = await this.usersRepository.findOneBy({ id: dto.userId });
    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    const post = this.postsRepository.create({
      content: dto.content,
      user: user,
      likesCount: 0
    });

    const savedPost = await this.postsRepository.save(post);
    return savedPost;
  } catch (error) {
    if (error instanceof NotFoundException) {
      throw error;
    }
    throw new BadRequestException('Error al crear el post');
  }
}

  async update(id: number, updatePostDto: UpdatePostDto): Promise<Post> {
    const post = await this.postsRepository.findOne({ where: { id } });
    if (!post) throw new NotFoundException('Post not found');

    const updated = Object.assign(post, updatePostDto); // Actualiza solo las propiedades presentes en updatePostDto
    return this.postsRepository.save(updated);
  }

  async darLikePosts(id: number) {
  const post = await this.postsRepository.findOne({ where: { id } });
  if (!post) {
    throw new NotFoundException(`Post con id: ${id} no encontrado`);
  }
  
  await this.postsRepository.increment({ id }, 'likesCount', 1);
  return this.postsRepository.findOne({ where: { id } });
}

  async delete(id: number) {
    const post = await this.postsRepository.findOne({ where: { id } });
    if (!post) {
      throw new NotFoundException(`Post con id ${id} no encontrado`);
    }
    return this.postsRepository.remove(post); // Hard delete
  }
}
