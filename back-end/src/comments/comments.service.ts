import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './comments.entity';
import { Post } from '../posts/post.entity';
import { User } from '../users/user.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Post) private readonly postsRepository: Repository<Post>,
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
    @InjectRepository(Comment)
    private readonly commentsRepository: Repository<Comment>,
  ) {}

  async buscarComentariosPorPost(postId: number): Promise<Comment[]> {
    const post = await this.postsRepository.findOne({
      where: { id: postId },
      relations: ['comments'], // Asegura que los comentarios se carguen con el post
    });
    if (!post) {
      throw new Error('Post not found');
    }
    return post.comments;
  }

  async crearComentario(
    postId: number,
    userId: number,
    content: string,
  ): Promise<Comment> {
    const post = await this.postsRepository.findOneBy({ id: postId });
    if (!post) {
      throw new Error('Post not found');
    }
    const user = await this.usersRepository.findOneBy({ id: userId });
    if (!user) {
      throw new Error('User not found');
    }
    const newComment = this.commentsRepository.create({
      content,
      post,
      user,
    });
    return this.commentsRepository.save(newComment);
  }

  async darLikeComentario(commentId: number): Promise<Comment> {
    const comment = await this.commentsRepository.findOneBy({ id: commentId });
    if (!comment) {
      throw new Error('Comment not found');
    }
    comment.likes += 1;
    return this.commentsRepository.save(comment);
  }
}
