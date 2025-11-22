// src/history/entities/history.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity()
export class History {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  category: string;

  @Column({ default: false })
  done: boolean; // ✅ si fue completada

  @CreateDateColumn()
  createdAt: Date; // 📅 fecha en que se registró
}
