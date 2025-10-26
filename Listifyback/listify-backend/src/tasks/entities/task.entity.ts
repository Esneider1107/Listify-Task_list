import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ nullable: true })
  description?: string;

  @Column({ nullable: true })
  category?: string;

  @Column({ type: 'datetime', nullable: true })
  dueDate?: Date;

  @Column({ default: false })
  done: boolean;

  @Column({ default: false })
  shared: boolean;

  @Column({ type: 'text', nullable: true })
  sharedWith?: string | null;



}
