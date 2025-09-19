import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Like } from './like.entity';
import { Post } from '../posts/post.entity';
import { User } from '../users/user.entity';

@Injectable()
export class LikesService {
  constructor(
    @InjectRepository(Like)
    private readonly likeRepo: Repository<Like>,
    @InjectRepository(Post)
    private readonly postRepo: Repository<Post>,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async toggleLike(userId: number, postId: number) {
    if (isNaN(Number(userId)) || isNaN(Number(postId))) {
      throw new BadRequestException('Invalid userId or postId');
    }

    const parsedUserId = Number(userId);
    const parsedPostId = Number(postId);

    // Verificar que el usuario y el post existan
    const user = await this.userRepo.findOne({ where: { id: parsedUserId } });
    const post = await this.postRepo.findOne({ where: { id: parsedPostId } });

    if (!user || !post) {
      throw new BadRequestException('User or Post not found');
    }

    // Buscar el like existente
    const existingLike = await this.likeRepo.findOne({
      where: { 
        user: { id: parsedUserId }, 
        post: { id: parsedPostId } 
      },
      relations: ['user', 'post']
    });

    try {
      if (existingLike) {
        // Eliminar like
        await this.likeRepo.remove(existingLike);
        await this.postRepo.decrement({ id: parsedPostId }, 'likesCount', 1);
        return { liked: false, likesCount: post.likesCount - 1 };
      } else {
        // Crear nuevo like
        const newLike = this.likeRepo.create({
          user,
          post
        });
        await this.likeRepo.save(newLike);
        await this.postRepo.increment({ id: parsedPostId }, 'likesCount', 1);
        return { liked: true, likesCount: post.likesCount + 1 };
      }
    } catch (error) {
      console.error('Error in toggleLike:', error);
      throw new BadRequestException('Error toggling like');
    }
  }

  async hasUserLiked(userId: number, postId: number) {
    if (isNaN(Number(userId)) || isNaN(Number(postId))) {
      throw new BadRequestException('Invalid userId or postId');
    }

    const parsedUserId = Number(userId);
    const parsedPostId = Number(postId);

    const like = await this.likeRepo.findOne({
      where: { 
        user: { id: parsedUserId }, 
        post: { id: parsedPostId } 
      },
      relations: ['user', 'post']
    });

    return !!like;
  }
}
