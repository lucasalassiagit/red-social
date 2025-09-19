import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './post.entity';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { UsersModule } from 'src/users/users.module';
import { forwardRef } from '@nestjs/common/utils/forward-ref.util';
import { CommentsModule } from 'src/comments/comments.module';
import { LikeModule } from 'src/like/like.module';

@Module({
  imports: [TypeOrmModule.forFeature([Post]), forwardRef(() => UsersModule) , forwardRef(() => CommentsModule), forwardRef(() => LikeModule)],
  providers: [PostsService],
  controllers: [PostsController],
  exports: [PostsService, TypeOrmModule], // exporto para que otros módulos lo usen
})
export class PostsModule {}
