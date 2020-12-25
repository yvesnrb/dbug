import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('contacts')
export default class Contact {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  meet?: string;

  @Column({ nullable: true })
  discord?: string;

  @Column({ nullable: true })
  zoom?: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
