import { DataSource } from 'typeorm';
import { User } from './src/users/user.entity';
import { Post } from './src/posts/post.entity';
import { Comment } from './src/comments/comments.entity';
import { Like } from './src/like/like.entity';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '12345',
  database: 'red-social',
  entities: [User, Post, Comment, Like],
  migrations: ['src/migrations/*.ts'],
  synchronize: false,
});
