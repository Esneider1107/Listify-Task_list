import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pet } from './entities/pet.entity';

@Injectable()
export class PetService {
  constructor(
    @InjectRepository(Pet)
    private readonly petRepository: Repository<Pet>,
  ) {}

  // 🔹 Obtener la mascota (por ahora solo hay una, con id 1)
  async getPet(): Promise<Pet> {
    let pet = await this.petRepository.findOne({ where: { id: 1 } });

    if (!pet) {
      pet = this.petRepository.create({
        id: 1,
        name: 'Listi',
        level: 1,
        experience: 0,
        unlocked: false,
      });
      await this.petRepository.save(pet);
    }

    return pet;
  }

  // 🔹 Desbloquear la mascota
  async unlockPet(): Promise<Pet> {
    const pet = await this.getPet();
    pet.unlocked = true;
    await this.petRepository.save(pet);
    return pet;
  }

  // 🔹 Añadir experiencia
  async addExperience(points: number): Promise<Pet> {
    const pet = await this.getPet();

    if (!pet.unlocked) {
      await this.unlockPet(); // se desbloquea automáticamente
    }

    pet.experience += points;

    // regla de nivel: cada 100 xp = +1 nivel (hasta nivel 10)
    while (pet.experience >= 100 && pet.level < 10) {
      pet.experience -= 100;
      pet.level++;
    }

    // si llega al nivel 10, la exp se reinicia
    if (pet.level === 10) {
      pet.experience = 0;
    }

    await this.petRepository.save(pet);
    return pet;
  }

  async renamePet(newName: string) {
  const pet = await this.petRepository.findOne({ where: { id: 1 } }); // tu mascota única
  if (!pet) throw new NotFoundException('Mascota no encontrada');
  if (!pet.unlocked) {
    throw new ForbiddenException('No puedes cambiar el nombre de una mascota bloqueada');
  }

  pet.name = newName;
  await this.petRepository.save(pet);

  return { message: `La mascota ahora se llama ${newName}` };
  }

}


