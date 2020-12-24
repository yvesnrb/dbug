import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import Contact from './contact-entity';

@Entity('users')
export default class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  contact_id: string;

  @OneToOne(() => Contact)
  @JoinColumn({ name: 'contact_id' })
  contact: Contact;

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
