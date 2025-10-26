import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from '../tasks/entities/task.entity';

@Injectable()
export class SocialService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {}

  // 📋 Ver todas las tareas compartidas
  async getSharedTasks(): Promise<Task[]> {
    return this.taskRepository.find({
      where: { shared: true },
      order: { dueDate: 'ASC' },
    });
  }

  // 👥 Ver con quién se compartió una tarea
  async getSharedWith(id: number): Promise<{ sharedWith: string | null | undefined }> {
  const task = await this.taskRepository.findOne({ where: { id } });
  if (!task) throw new Error('Tarea no encontrada');
  return { sharedWith: task.sharedWith };
}

  // 🚀 Compartir una tarea
  async shareTask(id: number, sharedWith: string): Promise<Task> {
    const task = await this.taskRepository.findOne({ where: { id } });
    if (!task) throw new Error('Tarea no encontrada');

    task.shared = true;
    task.category = 'Social';
    task.sharedWith = sharedWith;

    return this.taskRepository.save(task);
  }
}
