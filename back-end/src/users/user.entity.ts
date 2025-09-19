import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Post } from '../posts/post.entity';
import { Like } from '../like/like.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 100,
    nullable: false,
  })
  name: string;

  @Column({
    type: 'varchar',
    length: 100,
    nullable: false,
  })
  username: string;

  @Column({
    type: 'varchar',
    length: 200,
    nullable: false,
    //select: false,
  })
  password: string;

  @Column({
    type: 'varchar',
    length: 200,
    nullable: false,
  })
  email: string;

  @Column({
    type: 'boolean',
    default: true,
  })
  isActive: boolean;

  // Relación: Un usuario tiene muchos posts
  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];

  // Relación: Un usuario tiene muchos likes
  @OneToMany(() => Like, (like) => like.user)
  likes: Like[];
}
