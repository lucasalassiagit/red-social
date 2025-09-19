import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { User } from '../users/user.entity';
import { Comment } from '../comments/comments.entity';
import { Like } from '../like/like.entity';

@Entity('posts')
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'text',
    nullable: false,
  })
  content: string;

  @Column({
    type: 'timestamp', // TIMESTAMP WITH TIME ZONE
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  // Relación: Muchos posts pertenecen a un usuario
  @ManyToOne(() => User, (user) => user.posts, {
    eager: true, // Carga automática del usuario con el post
  })
  @JoinColumn({ name: 'user_id' }) // Columna en la tabla posts
  user: User;

  @OneToMany(() => Comment, (comment) => comment.post, {
    cascade: true,
    eager: true,
  }) //Luego cambiar el eager a false
  comments: Comment[];

  // Relación: Un post tiene muchos likes
  @OneToMany(() => Like, (like) => like.post)
  likes: Like[];

  @Column({ default: 0 })
  likesCount: number;
}
