import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { CommentsModule } from './comments/comments.module';
import { AuthModule } from './auth/auth.module';
import { LikeModule } from './like/like.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '12345',
      database: 'red-social',
      autoLoadEntities: true, // registra entidades de todos los módulos
      synchronize: false,
    }),
    UsersModule,
    PostsModule,
    CommentsModule,
    AuthModule,
    LikeModule,
  ],
})
export class AppModule {}
