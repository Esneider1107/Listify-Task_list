import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.create(createTaskDto);
  }

  @Get()
  findAll() {
    return this.tasksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.tasksService.findOne(id);
  }

  @Get('category/:category')
  findByCategory(@Param('category') category: string) {
  return this.tasksService.findByCategory(category);
}

@Get('date/:date')
findByDate(@Param('date') date: string) {
  return this.tasksService.findByDate(date);
}

@Get('range/:from/:to')
findUpcoming(@Param('from') from: string, @Param('to') to: string) {
  return this.tasksService.findUpcoming(from, to);
}

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    return this.tasksService.update(id, updateTaskDto);
  }

  @Patch(':id/done')
markAsDone(@Param('id', ParseIntPipe) id: number) {
  return this.tasksService.markTaskAsDone(id);
}


  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.tasksService.remove(id);
  }
}
