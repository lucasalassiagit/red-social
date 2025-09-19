import { Module } from '@nestjs/common';
import { LikesService } from './like.service';
import { LikesController } from './like.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Like } from './like.entity';
import { forwardRef } from '@nestjs/common/utils/forward-ref.util';
import { PostsModule } from 'src/posts/posts.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Like]), forwardRef(() => UsersModule) , forwardRef(() => PostsModule)],
  controllers: [LikesController],
  providers: [LikesService],
})
export class LikeModule {}
