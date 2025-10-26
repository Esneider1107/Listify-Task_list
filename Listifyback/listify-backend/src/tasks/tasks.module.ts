import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { PetModule } from '../pet/pet.module';
import { UserProgressModule } from '../user-progress/user-progress.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import {HistoryModule} from '../history/history.module';
 
@Module({
  imports: [PetModule, HistoryModule, UserProgressModule, TypeOrmModule.forFeature([Task])],
  controllers: [TasksController],
  providers: [TasksService]
})
export class TasksModule {}
