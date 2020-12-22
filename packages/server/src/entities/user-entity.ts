import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
export default class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  githubId: number;

  @Column()
  login: string;

  @Column()
  avatar_url: string;

  @Column()
  bio: string;

  @Column()
  followers: number;

  @Column()
  public_repos: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
