import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';
import { PetService } from '../pet/pet.service';
import { UserProgressService } from '../user-progress/user-progress.service';
import { HistoryService } from '../history/history.service';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
    private readonly petService: PetService,
    private readonly userProgressService: UserProgressService,
    private readonly historyService: HistoryService,
  ) {}

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const isShared = createTaskDto.shared ?? false;

    const newTask = this.taskRepository.create({
    title: createTaskDto.title,
    description: createTaskDto.description,
    category: isShared ? 'Social' : (createTaskDto.category ?? 'General'),
    dueDate: createTaskDto.dueDate ? new Date(createTaskDto.dueDate) : undefined,
    done: createTaskDto.done ?? false,
    shared: isShared,
    sharedWith: createTaskDto.sharedWith ?? null,
  });

  //  Guardar la tarea en la base de datos
  const savedTask = await this.taskRepository.save(newTask);

  //  Agregar al historial (como pendiente)
  await this.historyService.addToHistory({
    title: savedTask.title,
    description: savedTask.description,
    category: savedTask.category,
    done: savedTask.done, // en la mayoría de casos será false
  });

  return savedTask;
}

  async findAll(): Promise<Task[]> {
    return await this.taskRepository.find();
  }

  async findOne(id: number): Promise<Task> {
    const task = await this.taskRepository.findOne({ where: { id } });
    if (!task) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }
    return task;
  }

  async findByCategory(category: string): Promise<Task[]> {
    return await this.taskRepository.find({ where: { category } });
  }

  async findByDate(date: string): Promise<Task[]> {
    const targetDate = new Date(date);
    
    // Inicio del día (00:00:00)
    const startOfDay = new Date(targetDate);
    startOfDay.setHours(0, 0, 0, 0);
    
    // Fin del día (23:59:59)
    const endOfDay = new Date(targetDate);
    endOfDay.setHours(23, 59, 59, 999);

    return await this.taskRepository.find({
      where: {
        dueDate: Between(startOfDay, endOfDay),
      },
    });
  }

  async findUpcoming(from: string, to: string): Promise<Task[]> {
    const start = new Date(from);
    const end = new Date(to);
    
    return await this.taskRepository.find({
      where: {
        dueDate: Between(start, end),
      },
      order: {
        dueDate: 'ASC',
      },
    });
  }

  async update(id: number, updateTaskDto: UpdateTaskDto): Promise<Task> {
    const task = await this.findOne(id);

    // Actualizar propiedades
    Object.assign(task, updateTaskDto);
    
    if (updateTaskDto.dueDate) {
      task.dueDate = new Date(updateTaskDto.dueDate);
    }

    return await this.taskRepository.save(task);
  }

  async remove(id: number): Promise<{ message: string }> {
    const task = await this.findOne(id);
    await this.taskRepository.remove(task);
    return { message: `Task with id ${id} deleted` };
  }

  async markTaskAsDone(id: number):  Promise<{ message: string }> {
    const task = await this.findOne(id);

    // Agregar experiencia al usuario
    await this.userProgressService.addExperience(10);


    //  Añadir al historial ANTES de eliminarla
    await this.historyService.addToHistory({
    title: task.title,
    description: task.description,
    category: task.category,
    done: true,
  });

    // eliminar la tarea después de marcarla como hecha
    await this.taskRepository.remove(task);
    
    return { message: `Tarea "${task.title}" completada y eliminada ` };
  }
}