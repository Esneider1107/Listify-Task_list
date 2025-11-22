//user-progress/user-progress.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserProgress } from './entities/user-progress.entity';
import { PetService } from '../pet/pet.service';

@Injectable()
export class UserProgressService {
  constructor(
    @InjectRepository(UserProgress)
    private readonly userProgressRepository: Repository<UserProgress>,
    private readonly petService: PetService,
  ) {}

  // Obtener progreso del usuario (por ahora solo el primero)
  async getProgress() {
    let progress = await this.userProgressRepository.findOne({ where: { id: 1 } });

    // Si no existe, se crea uno nuevo
    if (!progress) {
      progress = this.userProgressRepository.create();
      await this.userProgressRepository.save(progress);
    }

    return progress;
  }

  // Añadir experiencia
  async addExperience(points: number) {
  let progress = await this.userProgressRepository.findOne({ where: { id: 1 } });
  
  const pointsToAdd = Number(points);

  if (isNaN(pointsToAdd) || pointsToAdd <= 0) {
    throw new Error(`Valor de experiencia inválido: ${points}`);
  }

  // ✅ Si no existe registro, crearlo con valores iniciales
  if (!progress) {
    progress = this.userProgressRepository.create({
      id: 1,
      experience: 0,
      petUnlocked: false,
    });
  }

  // ✅ Asegurar que la experiencia sea numérica
  progress.experience = Number(progress.experience) || 0;

  if (!progress.petUnlocked) {
    // ✅ Sumar la experiencia correctamente
    progress.experience += pointsToAdd;

    if (progress.experience >= 100) {
      progress.petUnlocked = true;
      await this.petService.unlockPet(); // Desbloquear mascota
    }

    // ✅ Guardar los cambios en la base de datos
    await this.userProgressRepository.save(progress);

    return { experience: progress.experience, petUnlocked: progress.petUnlocked };
  } else {
    // ✅ Mascota ya desbloqueada, sumar experiencia a la mascota
    await this.petService.addExperience(pointsToAdd);
    return { message: 'Experiencia sumada a la mascota' };
  }
}

}