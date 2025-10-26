import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Pet {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: 'Listi' })
  name: string;

  @Column({ default: 1 })
  level: number;

  @Column({ default: 0 })
  experience: number;

  @Column({ default: false })
  unlocked: boolean;
}
