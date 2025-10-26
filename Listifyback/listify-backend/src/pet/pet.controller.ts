import { Controller, Get, Post, Body, Patch } from '@nestjs/common';
import { PetService } from './pet.service';
import { AddExperienceDto } from './dto/add-experience.dto';
import { RenamePetDto } from './dto/rename-pet.dto';

@Controller('pet')
export class PetController {
  constructor(private readonly petService: PetService) {}

  @Get()
  getPet() {
    return this.petService.getPet();
  }

  @Post('experience')
  addExperience(@Body() addExperienceDto: AddExperienceDto) {
    return this.petService.addExperience(addExperienceDto.points);
  }

  @Post('unlock')
  unlockPet() {
    return this.petService.unlockPet();
  }

  @Patch('rename')
  renamePet(@Body() renamePetDto: RenamePetDto) {
    return this.petService.renamePet(renamePetDto.name);
  }
}
