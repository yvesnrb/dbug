import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import User from './user-entity';

@Entity('projects')
export default class Project {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true, type: 'uuid' })
  author_id: string | null;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'author_id' })
  author: User;

  @Column()
  body: string;

  @Column()
  is_archived: boolean;

  @ManyToMany(() => User)
  @JoinTable({
    name: 'projects_shares_users',
    joinColumn: { name: 'project_id' },
    inverseJoinColumn: { name: 'user_id' },
  })
  shares: User[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
