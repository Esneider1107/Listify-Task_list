import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class UserProgress {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: 0 })
  experience: number;

  @Column({ default: false })
  petUnlocked: boolean;
}
