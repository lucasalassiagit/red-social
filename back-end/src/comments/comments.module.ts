import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from './comments.entity';
import { PostsModule } from 'src/posts/posts.module';
import { forwardRef } from '@nestjs/common/utils/forward-ref.util';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Comment]), forwardRef(() => PostsModule), forwardRef(() => UsersModule)],
  providers: [CommentsService],
  controllers: [CommentsController],
  exports: [CommentsService, TypeOrmModule], // exporto para que otros módulos lo usen
})
export class CommentsModule {}
