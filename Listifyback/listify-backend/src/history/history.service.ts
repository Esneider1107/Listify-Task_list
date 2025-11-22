//history.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { History } from './entities/history.entity';

@Injectable()
export class HistoryService {
  constructor(
    @InjectRepository(History)
    private readonly historyRepository: Repository<History>,
  ) {}

  //  Registrar una tarea (hecha o no)
  async addToHistory(task: { title: string; description?: string; category?: string; done: boolean }) {
  // Buscar si ya existe una entrada con el mismo título
  let existingEntry = await this.historyRepository.findOne({
    where: { title: task.title },
  });

  if (existingEntry) {
    //  Si ya existe, solo actualiza su estado
    existingEntry.done = task.done;
    existingEntry.description = task.description ?? existingEntry.description;
    existingEntry.category = task.category ?? existingEntry.category;
    return this.historyRepository.save(existingEntry);
  }

  //  Si no existe, crea una nueva entrada
  const newEntry = this.historyRepository.create(task);
  return this.historyRepository.save(newEntry);
}


  //  Ver todo el historial
  async getAll() {
    return this.historyRepository.find({
      order: { createdAt: 'DESC' },
    });
  }

  //  Filtrar solo completadas
  async getCompleted() {
    return this.historyRepository.find({
      where: { done: true },
      order: { createdAt: 'DESC' },
    });
  }

  //  Filtrar solo pendientes
  async getPending() {
    return this.historyRepository.find({
      where: { done: false },
      order: { createdAt: 'DESC' },
    });
  }
}
