// user-progress.module.ts
import { Module } from '@nestjs/common';
import { UserProgressService } from './user-progress.service';
import { PetModule } from '../pet/pet.module';
import { UserProgressController } from './user-progress.controller';
import { UserProgress } from './entities/user-progress.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([UserProgress]), PetModule], 
  controllers: [UserProgressController],
  providers: [UserProgressService],
  exports: [UserProgressService],
})
export class UserProgressModule {}
