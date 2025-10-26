import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './tasks/tasks.module';
import { UserProgressModule } from './user-progress/user-progress.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './tasks/entities/task.entity';
import { UserProgress } from './user-progress/entities/user-progress.entity';
import { Pet } from './pet/entities/pet.entity';
import { HistoryModule } from './history/history.module';
import { History } from './history/entities/history.entity';
import { SocialModule } from './social/social.module';

@Module({
  imports: [TasksModule, UserProgressModule, TypeOrmModule.forRoot({
      type: 'sqlite', 
      database: 'db.sqlite',
      entities: [Task,UserProgress,Pet,History],
      autoLoadEntities: true,
      synchronize: true, 
    }), HistoryModule, SocialModule,],  
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
