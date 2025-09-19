import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PostsModule } from 'src/posts/posts.module';
import { forwardRef } from '@nestjs/common/utils/forward-ref.util';
import { CommentsModule } from 'src/comments/comments.module';
import { LikeModule } from 'src/like/like.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), forwardRef(() => PostsModule), forwardRef(() => CommentsModule), forwardRef(() => LikeModule)],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService, TypeOrmModule], // exporto para que otros módulos lo usen
})
export class UsersModule {}
